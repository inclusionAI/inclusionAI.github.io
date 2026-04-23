import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Spin } from 'antd';
import dayjs from "dayjs";
import clsx from "clsx";
import styles from "../research.module.css";
import UserDetail from "./UserDetail";

// 动态导入 echarts（仅在客户端）
let echarts: any = null;
if (typeof window !== 'undefined') {
  echarts = require('echarts');
  require('echarts/lib/chart/map');
  require('echarts/lib/component/geo');
  require('echarts/lib/component/visualMap');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
}

// API 基础 URL
const OSS_BASE_URL = "https://oss.open-digger.cn";

// 项目详情数据接口
interface ProjectDetailData {
  id: string;
  name: string;
  name_zh: string;
  logo: string;
  description: string;
  description_zh: string;
  tags: string[];
  website: string;
  // 当前指标
  currentOpenrank: number;
  prevOpenrank: number;
  currentParticipants: number;
  prevParticipants: number;
  currentActivity: number;
  prevActivity: number;
  // 历史数据
  openrankHistory: { date: string; value: number }[];
  activityHistory: { date: string; value: number }[];
  participantsHistory: { date: string; value: number }[];
  issueCountHistory: { date: string; value: number }[];
  // 贡献者
  contributors: { rank: number; prevRank: number; name: string; platform: string; avatar: string; openrank: number;prevOpenrank: number; profileUrl: string; location?: string; company?: string }[];
  contributorsPage: { rank: number; prevRank: number; name: string; platform: string; avatar: string; openrank: number;prevOpenrank: number; profileUrl: string; location?: string; company?: string }[];
  contributorDate: string;
  contributorsResponseRaw: Record<string, any[]>;
  // 贡献度分布（近一年）- 国家
  countryDistribution: { rank: number; country: string; countryCode: string; flag: string; openrank: number; developers: number; count: number }[];
  // 原始数据（用于时间类型切换）
  rawOpenrank: Record<string, number>;
  rawActivity: Record<string, number>;
  rawParticipants: Record<string, number>;
  rawIssues: Record<string, number>;
  rawContributors: Record<string, any[]>;
}

// 国家名称映射（英文全称到英文简称）
const countryNameMap: { [key: string]: string } = {
  'United States of America': 'United States',
  'United Kingdom of Great Britain and Northern Ireland': 'United Kingdom',
  'Korea, Republic of': 'South Korea',
  "Korea (Democratic People's Republic of)": 'North Korea',
  'Russian Federation': 'Russia',
  'Viet Nam': 'Vietnam',
  'Iran, Islamic Republic of': 'Iran',
  'Venezuela, Bolivarian Republic of': 'Venezuela',
  'Bolivia, Plurinational State of': 'Bolivia',
  'Tanzania, United Republic of': 'Tanzania',
  'Congo, The Democratic Republic of the': 'DR Congo',
  'Congo': 'Congo',
  "Côte d'Ivoire": 'Ivory Coast',
  'Lao People\'s Democratic Republic': 'Laos',
  'Syrian Arab Republic': 'Syria',
  'Brunei Darussalam': 'Brunei',
  'Myanmar': 'Myanmar',
  'Timor-Leste': 'East Timor',
  'Palestine, State of': 'Palestine',
  'Macedonia, Republic of': 'North Macedonia',
  'Moldova, Republic of': 'Moldova',
  'Holy See': 'Vatican',
};

// 获取国家简称（如果存在映射则使用简称，否则返回原名）
function getCountryShortName(countryName: string): string {
  if (!countryName) return '';
  return countryNameMap[countryName] || countryName;
}

// 国家旗帜映射（按简称映射）
const countryFlagMap: { [key: string]: string } = {
  'United States': '🇺🇸',
  'China': '🇨🇳',
  'Germany': '🇩🇪',
  'United Kingdom': '🇬🇧',
  'India': '🇮🇳',
  'France': '🇫🇷',
  'Canada': '🇨🇦',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Korea': '🇰🇷',
  'Brazil': '🇧🇷',
  'Australia': '🇦🇺',
  'Russia': '🇷🇺',
  'Netherlands': '🇳🇱',
  'Singapore': '🇸🇬',
  'Switzerland': '🇨🇭',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Mexico': '🇲🇽',
  'Indonesia': '🇮🇩',
  'Saudi Arabia': '🇸🇦',
  'South Africa': '🇿🇦',
  'Egypt': '🇪🇬',
  'Nigeria': '🇳🇬',
  'Argentina': '🇦🇷',
  'Poland': '🇵🇱',
  'Turkey': '🇹🇷',
  'Iran': '🇮🇷',
  'Thailand': '🇹🇭',
  'Vietnam': '🇻🇳',
  'Philippines': '🇵🇭',
  'Pakistan': '🇵🇰',
  'Bangladesh': '🇧🇩',
  'Ukraine': '🇺🇦',
  'Israel': '🇮🇱',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Ireland': '🇮🇪',
  'Austria': '🇦🇹',
  'Belgium': '🇧🇪',
  'Portugal': '🇵🇹',
  'Czech Republic': '🇨🇿',
  'Romania': '🇷🇴',
  'Hungary': '🇭🇺',
  'Greece': '🇬🇷',
  'New Zealand': '🇳🇿',
  'Chile': '🇨🇱',
  'Colombia': '🇨🇴',
  'Malaysia': '🇲🇾',
  'Czechia': '🇨🇿',
};

// 从ID中提取项目名，例如 ":companies/nvidia/dynamo" -> "dynamo"
function extractProjectName(projectId: string): string {
  if (!projectId) return '';
  const parts = projectId.split('/');
  return parts[parts.length - 1] || '';
}

// 根据平台生成用户个人主页URL
function getProfileUrl(platform: string, userLogin: string): string {
  if (!userLogin) return '';
  if (platform === 'Gitee' || platform === 'AtomGit') {
    return `https://atomgit.com/${userLogin}`;
  } else if (platform === 'GitHub') {
    return `https://github.com/${userLogin}`;
  }
  return '';
}

// 获取项目详情数据
async function fetchProjectData(
  projectId: string, 
  timeRangeType: "month" | "year" = "month",
  selectedYear?: string,
  selectedMonth?: string
): Promise<ProjectDetailData | null> {
  try {
    // 项目ID：直接从id获取，格式如 :companies/nvidia/dynamo
    // OSS路径使用projectId，格式如 :companies/nvidia/dynamo
    const projectName = extractProjectName(projectId);
    
    // 使用新的API路径格式：${OSS_BASE_URL}/${projectId}/
    const basePath = `${OSS_BASE_URL}/${projectId}`;
    
    // 获取项目meta信息
    const metaUrl = `${basePath}/meta.json`;
    
    const [metaResponse, openrankResponse, activityResponse, participantsResponse, issuesResponse, contributorsResponse] = await Promise.all([
      fetch(metaUrl).then(r => r.ok ? r.json() : Promise.resolve(null)).catch(() => null),
      fetch(`${basePath}/openrank.json`).then(r => r.ok ? r.json() : ({} as any)).catch(() => ({})),
      fetch(`${basePath}/activity.json`).then(r => r.ok ? r.json() : ({} as any)).catch(() => ({})),
      fetch(`${basePath}/participants.json`).then(r => r.ok ? r.json() : ({} as any)).catch(() => ({})),
      fetch(`${basePath}/issues_and_change_request_active.json`).then(r => r.ok ? r.json() : ({} as any)).catch(() => ({})),
      fetch(`${basePath}/community_openrank_details.json`).then(r => r.ok ? r.json() : ({} as any)).catch(() => ({})),
    ]);

    
    // 处理项目meta信息
    const projectMeta = metaResponse || {};
    const tags = projectMeta.labels?.map((l: any) => l.name) || [];

    // 直接使用原始数据（不筛选，由组件根据时间类型处理）
    const rawOpenrank = openrankResponse || {};
    const rawActivity = activityResponse || {};
    const rawParticipants = participantsResponse || {};
    const rawIssues = issuesResponse || {};
    const rawContributors = contributorsResponse || {};

    // 使用传入的日期构造当前日期
    const currentYear = selectedYear;
    const currentMonth = `${selectedYear}-${selectedMonth}`;
    const currentDate = dayjs(currentMonth, "YYYY-MM");

    // 计算前一个时期（前一个月或前一年）
    let prevPeriod: string;
    let prevPrePeriod: string;

    if (timeRangeType === "year") {
      // 年度模式：前一年
      prevPeriod =currentDate.subtract(1, 'year').format('YYYY');
      prevPrePeriod =currentDate.subtract(2, 'year').format('YYYY');
    } else {
      // 月度模式：前一个月
      prevPeriod = currentDate.subtract(1, 'month').format('YYYY-MM');
      prevPrePeriod = currentDate.subtract(2, 'month').format('YYYY-MM');
    }

    // 根据时间类型筛选数据（历史图使用全部数据）
    const filterByTimeRange = (data: Record<string, number>): Record<string, number> => {
      const result: Record<string, number> = {};
      for (const [key, value] of Object.entries(data)) {
        if (timeRangeType === "month") {
          // 月度数据：只保留 yyyy-mm 格式的key
          if (/^\d{4}-\d{2}$/.test(key)) {
            result[key] = value;
          }
        } else {
          // 年度数据：只保留 yyyy 格式的key
          if (/^\d{4}$/.test(key)) {
            result[key] = value;
          }
        }
      }
      return result;
    };

    const openrankData = filterByTimeRange(rawOpenrank);
    const activityData = filterByTimeRange(rawActivity);
    const participantsData = filterByTimeRange(rawParticipants);
    const issuesData = filterByTimeRange(rawIssues);

    // 处理openrank历史数据（取筛选后的数据）
    const openrankHistory: { date: string; value: number }[] = [];
    for (const date of Object.keys(openrankData)) {
      const value = openrankData[date];
      if (value !== undefined) {
        openrankHistory.push({ date, value });
      }
    }
    
    // 处理activity历史数据
    const activityHistory: { date: string; value: number }[] = [];
    for (const date of Object.keys(activityData)) {
      const value = activityData[date];
      if (value !== undefined) {
        activityHistory.push({ date, value });
      }
    }
    
    // 处理participants历史数据
    const participantsHistory: { date: string; value: number }[] = [];
    for (const date of Object.keys(participantsData)) {
      const value = participantsData[date];
      if (value !== undefined) {
        participantsHistory.push({ date, value });
      }
    }
    
    // 处理issues历史数据
    const issueCountHistory: { date: string; value: number }[] = [];
    for (const date of Object.keys(issuesData)) {
      const value = issuesData[date];
      if (value !== undefined) {
        issueCountHistory.push({ date, value });
      }
    }
    
    // 当前值（使用YYYY格式的key）
    const currentKey = timeRangeType === "year" ? currentYear : currentMonth;
    const currentOpenrank = openrankData[currentKey] || 0;
    const prevOpenrank = openrankData[prevPeriod] || 0;
    const currentActivity = activityData[currentKey] || 0;
    const prevActivity = activityData[prevPeriod] || 0;
    const currentParticipants = participantsData[currentKey] || 0;
    const prevParticipants = participantsData[prevPeriod] || 0;
    let contributorDate="";
    

    // 用来计算排名变化：将上一期数据转换为以 item[0] 为 key 的 map，值为 { rank, openrank }
    const prevContributorMap = new Map<string, { rank: number; openrank: number }>();

    if(rawContributors[currentKey]){
      contributorDate = currentKey;
    }else{
      contributorDate = prevPeriod;
    }

    // 保存当前的贡献者表格数据，如果当前月/年为空，则取前年或者月
    const contributorsData = rawContributors[contributorDate];

    const prevContributorData = rawContributors[currentKey] ?  rawContributors[prevPeriod] : rawContributors[prevPrePeriod];
    prevContributorData.forEach((item: any, index: number) => {
      prevContributorMap.set(item[2], { rank: index + 1, openrank: item[3] || 0 }); // 排名 = index + 1
    });

    // 获取用户头像URL
    const getUserAvatar = (platform: string, name: string): string => {
      if (!name) return '';
      if (platform === 'Gitee' || platform === 'AtomGit') {
        // Gitee 和 AtomGit 使用 gitee 的头像 API
        return `https://gitee.com/${name}/avatar`;
      }
      // GitHub 使用 github 的头像
      return `https://avatars.githubusercontent.com/${name}?v=4`;
    };

    // 找出当前选中的月份数据或者年份数据
    const contributors = contributorsData.map((item: any, index: number) => {
      const platform = item[0];
      const currentOpenrank = item[3] || 0;
      const prevData = prevContributorMap.get(item[2]);
      const prevRank = prevData?.rank || 0;
      const prevOpenrank = prevData?.openrank || 0;
      const currentRank = index + 1;
      return {
        rank: currentRank,
        prevRank: prevRank,
        name: item[2] || '',
        platform: platform,
        avatar: getUserAvatar(platform, item[2]),
        openrank: currentOpenrank,
        prevOpenrank:  prevOpenrank,
        profileUrl: getProfileUrl(platform, item[2]),
      };
    });
    const contributorsPage = contributors.slice(0,10) || [];
    

    // 处理国家分布数据（从meta中的contributions获取）
    // 使用 getCountryShortName 将国家全称转换为简称
    const contributions = projectMeta.contributions || [];
    const countryDistribution = contributions.map((item: any, index: number) => {
      const shortName = getCountryShortName(item.country);
      return {
        rank: index + 1,
        country: shortName,
        flag: countryFlagMap[shortName] || '🏳️',
        openrank: item.openrank || 0,
        developers: item.developers || 0
      };
    });
    
    return {
      id: projectId,
      name: projectMeta.name || projectName,
      name_zh:  projectMeta.name || projectName,
      logo: `${OSS_BASE_URL}/${projectId}/logo.png`,
      description: projectMeta.description || '',
      description_zh:  projectMeta.description || '',
      tags,
      website: `https://github.com/${projectName}`,
      currentOpenrank,
      prevOpenrank,
      currentParticipants,
      prevParticipants,
      currentActivity,
      prevActivity,
      openrankHistory,
      activityHistory,
      participantsHistory,
      issueCountHistory,
      contributors,
      contributorsPage,
      contributorDate,
      contributorsResponseRaw: rawContributors,
      countryDistribution,
      // 原始数据（用于时间类型切换）
      rawOpenrank,
      rawActivity,
      rawParticipants,
      rawIssues,
      rawContributors
    };
  } catch (error) {
    console.error("Failed to fetch project data:", error);
    return null;
  }
}

export default function ProjectDetail({ 
  projectName, 
  projectAvatar, 
  timeRangeType: initialTimeRangeType, 
  selectedYear: initialSelectedYear, 
  selectedMonth: initialSelectedMonth,
  onBack 
}: { 
  projectName: string; 
  projectAvatar?: string; 
  timeRangeType?: "month" | "year";
  selectedYear?: string;
  selectedMonth?: string;
  onBack: () => void 
}) {

  // 排名变化指示器
  function ChangeIndicator({ current, previous }: { current: number; previous: number }) {
    if(!previous){
      return '-';
    }
    const diff = current - previous;
    if (diff === 0) {
      return <span className={styles.changeZero}>0</span>;
    }
    const isUp = diff > 0;
    return (
      <span className={clsx(styles.changeIndicator, isUp ? styles.changeUp : styles.changeDown)}>
        <span className={styles.changeArrow}>{isUp ? "↑" : "↓"}</span>
        <span className={styles.changeValue}>{Math.abs(Math.round(diff * 10) / 10)}</span>
      </span>
    );
  }

  // 用户头像组件 - 如果头像不存在，使用随机颜色方块+首字母
  function UserAvatar({ name, avatar, className }: { name: string; avatar?: string; className?: string }) {
    const [imgError, setImgError] = useState(false);
    
    // 生成基于用户名的固定颜色
    const getColorFromName = (str: string): string => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const colors = [
        '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', 
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#14b8a6',
        '#6366f1', '#d946ef', '#0ea5e9', '#eab308', '#a855f7'
      ];
      return colors[Math.abs(hash) % colors.length];
    };
    
    // 获取首字母
    const getInitial = (str: string): string => {
      return str.charAt(0).toUpperCase();
    };
    
    const hasValidAvatar = avatar && !imgError;
    const bgColor = getColorFromName(name);
    const initial = getInitial(name);
    
    if (hasValidAvatar) {
      return (
        <img 
          src={avatar} 
          alt={name} 
          className={className}
          onError={() => setImgError(true)}
        />
      );
    }
    
    return (
      <div 
        className={className} 
        style={{ 
          backgroundColor: bgColor, 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: '14px',
          borderRadius: '8px'
        }}
      >
        {initial}
      </div>
    );
  }

  // 项目头像组件 - 如果头像不存在，使用随机颜色方块+首字母
  function ProjectLogo({ name, logo, className }: { name: string; logo?: string; className?: string }) {
    const [imgError, setImgError] = useState(false);
    
    // 生成基于项目名的固定颜色
    const getColorFromName = (str: string): string => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const colors = [
        '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', 
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#14b8a6',
        '#6366f1', '#d946ef', '#0ea5e9', '#eab308', '#a855f7'
      ];
      return colors[Math.abs(hash) % colors.length];
    };
    
    // 获取首字母
    const getInitial = (str: string): string => {
      return str.charAt(0).toUpperCase();
    };
    
    const hasValidLogo = logo && !imgError;
    const bgColor = getColorFromName(name);
    const initial = getInitial(name);
    
    if (hasValidLogo) {
      return (
        <img 
          src={logo} 
          alt={name} 
          className={className}
          onError={() => setImgError(true)}
        />
      );
    }
    
    return (
      <div 
        className={className} 
        style={{ 
          backgroundColor: bgColor, 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: '18px',
          borderRadius: '12px'
        }}
      >
        {initial}
      </div>
    );
  }

  // 排名变化组件（用于表格，同时显示排名和变化）
  function RankWithChange({ rank, prevRank }: { rank: number; prevRank: number }) {
    let change = prevRank - rank;
    if(!prevRank){
      change=0;
    }
    return (
      <div className={styles.rankWithChange}>
        <span className={clsx(styles.rankBadge)}>
          {rank}
        </span>
        <span className={clsx(styles.rankChange, {
          [styles.rankChangeUp]: change > 0,
          [styles.rankChangeDown]: change < 0,
          [styles.rankChangeZero]: change === 0,
        })}>
          {change > 0 ? `↑${change}` : change < 0 ? `↓${Math.abs(change)}` : '-'}
        </span>
      </div>
    );
  }

  // 平台图标组件
  function PlatformIcon({ platform }: { platform: string }) {
    if (platform === 'GitHub') {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    } else if (platform === 'Gitee' || platform === 'AtomGit') {
      return (
        <svg t="1778465451987" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1706" width="20" height="20">
          <path d="M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z" fill="#C71D23" p-id="1707"></path>
          <path d="M762.538667 457.045333h-281.088a24.4736 24.4736 0 0 0-24.439467 24.405334v61.098666c-0.034133 13.5168 10.922667 24.439467 24.405333 24.439467h171.1104c13.5168 0 24.439467 10.922667 24.439467 24.439467v12.219733a73.3184 73.3184 0 0 1-73.3184 73.3184h-232.209067a24.439467 24.439467 0 0 1-24.439466-24.439467v-232.174933a73.3184 73.3184 0 0 1 73.3184-73.3184h342.152533c13.482667 0 24.405333-10.922667 24.439467-24.439467l0.034133-61.098666a24.405333 24.405333 0 0 0-24.405333-24.439467H420.352a183.296 183.296 0 0 0-183.296 183.296V762.538667c0 13.482667 10.922667 24.439467 24.405333 24.439466h360.516267a164.9664 164.9664 0 0 0 165.000533-165.000533v-140.526933a24.439467 24.439467 0 0 0-24.439466-24.439467z" fill="#FFFFFF" p-id="1708"></path>
        </svg>
      );
    }
    return <span>{platform}</span>;
  }

  // 折线图组件
  function LineChart({ data, color = "#22c55e", unit = "", timeRangeType = "month" }: { data: { date: string; value: number }[]; color?: string; unit?: string; timeRangeType?: "month" | "year" }) {
    if (!data || data.length === 0) return null;

    const values = data.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;

    // 生成平滑曲线路径（使用贝塞尔曲线）
    const getPoint = (index: number) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((data[index].value - minValue) / range) * 100;
      return { x, y };
    };

    // 生成平滑的贝塞尔曲线路径
    let pathD = "";
    if (data.length === 1) {
      const p = getPoint(0);
      pathD = `M ${p.x} ${p.y}`;
    } else {
      // 使用三次贝塞尔曲线连接各点
      const points = data.map((_, i) => getPoint(i));
      
      pathD = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        
        // 计算控制点
        const cp1x = p0.x + (p1.x - p0.x) / 3;
        const cp1y = p0.y;
        const cp2x = p0.x + (p1.x - p0.x) * 2 / 3;
        const cp2y = p1.y;
        
        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
      }
    }

    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 100;
      return `${x},${y}`;
    }).join(" ");

    // Y轴刻度（3个点）- 使用合适的刻度值（整数或10/5的倍数）
    const getNiceScaleValues = (min: number, max: number, tickCount: number): number[] => {
      if (tickCount < 2) return [min];

      const range = max - min;
      if (range === 0) {
        return Array(tickCount).fill(min);
      }

      // 计算合适的刻度间隔
      const rawStep = range / (tickCount - 1);

      // 计算10的幂次
      const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));

      // 尝试找到合适的nice step (1, 2, 5, 10 的倍数)
      const multiples = [1, 2, 5, 10];
      let niceStep = rawStep;

      for (const mult of multiples) {
        const step = mult * magnitude;
        if (step >= rawStep) {
          niceStep = step;
          break;
        }
      }

      // 从最小值向下取整开始，生成刻度
      const startValue = Math.floor(min / niceStep) * niceStep;
      const ticks: number[] = [];

      for (let i = 0; i < tickCount; i++) {
        const value = startValue + i * niceStep;
        ticks.push(value);
      }

      // 确保覆盖最大值，如果最后一个刻度小于最大值，扩展刻度
      if (ticks[ticks.length - 1] < max) {
        ticks[ticks.length - 1] = Math.ceil(max / niceStep) * niceStep;
      }

      return ticks;
    };

    const yAxisValues = getNiceScaleValues(minValue, maxValue, 5).reverse();

    return (
      <div className={styles.lineChartContainer}>
        {/* Y轴数值显示在图表左侧 */}
        <div style={{ position: 'absolute', left: '8px', top: '0', bottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
          {yAxisValues.map((value, index) => (
            <span key={index} style={{ fontSize: '10px', color: '#6b7280', lineHeight: '1' }}>
              {value}
            </span>
          ))}
        </div>
        <svg className={styles.lineChart} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={pathD + " L 100,100 L 0,100 Z"}
            fill={`url(#gradient-${color})`}
          />
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* X轴刻度文字 - 只显示第一条和最后一条 */}
        <div className={styles.lineChartXAxis}>
          {data.length > 0 && (
            <>
              <span>{data[0].date}</span>
              {data.length > 1 && <span style={{ marginLeft: 'auto' }}>{data[data.length - 1].date}</span>}
            </>
          )}
        </div>
      </div>
    );
  }

  // 地图分布组件 - 使用世界地图
  function CountryMapChart({ data }: { data: ProjectDetailData['countryDistribution'] }) {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<any>(null);

    useEffect(() => {
      // SSR 时跳过渲染
      if (typeof window === 'undefined') return;
      if (!chartRef.current || !data || data.length === 0) return;

      // 清理之前的图表实例
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }

      const chart = echarts.init(chartRef.current);
      chartInstanceRef.current = chart;

      // 准备地图数据
      const mapData = data.map(item => {
        return {
          name: item.country,
          value: item.openrank,
          flag: item.flag,
          developers: item.developers,
        };
      });

      const maxValue = Math.max(...data.map(d => d.openrank));
      const minValue = 0;

      // 显示加载状态
      chart.showLoading();

      // 从远程加载世界地图
      fetch('https://fastly.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json')
        .then(response => response.json())
        .then(geoJson => {
          chart.hideLoading();
          echarts.registerMap('world', geoJson);

          const option: any = {
            title: {
              text: '',
              left: 'center',
            },
            tooltip: {
              trigger: 'item',
              formatter: (params: any) => {
                if (params.data && params.data.value != null) {
                  const flag = params.data.flag || '';
                  const value = params.data.value ?? 0;
                  const developers = params.data.developers ?? 0;
                  return `${flag} ${params.name}<br/>OpenRank: ${value.toLocaleString()}<br/>Developers: ${developers}`;
                }
                return params.name ? `${params.name}<br/>No Data` : '';
              },
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: minValue,
              max: maxValue,
              text: ['高', '低'],
              realtime: false,
              calculable: true,
              inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
              }
            },
            series: [
              {
                name: '国家贡献度',
                type: 'map',
                map: 'world',
                roam: true,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                  itemStyle: {
                    areaColor: '#fef08a',
                  },
                },
                data: mapData
              },
            ],
          };

          chart.setOption(option);
        })
        .catch(error => {
          console.error('加载地图数据失败:', error);
          chart.hideLoading();
        });

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
  }

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProjectDetailData | null>(null);
  const [timeRangeType, setTimeRangeType] = useState<"month" | "year">(initialTimeRangeType || "month");
  const [selectedYear, setSelectedYear] = useState(initialSelectedYear || "2026");
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth || "03");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserAvatar, setSelectedUserAvatar] = useState<string>('');
  const [selectedUserPlatform, setSelectedUserPlatform] = useState<string>('GitHub');
  const [contributors, setContributors] = useState<ProjectDetailData['contributorsPage']>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [allContributors, setAllContributors] = useState<ProjectDetailData['contributors']>([]);
  const [contributorsRawData, setContributorsRawData] = useState<Record<string, any[]>>({});
  // 贡献者数据的最大可选日期
  const [maxContributorDate, setMaxContributorDate] = useState<dayjs.Dayjs | null>(null);
  // 存储GitHub用户信息（location和company）
  const [userInfoMap, setUserInfoMap] = useState<Record<string, { location?: string; company?: string }>>({});

  // 从localStorage加载缓存的用户信息
  const loadUserInfoFromCache = (): Record<string, { location?: string; company?: string }> => {
    try {
      const cached = localStorage.getItem('github_user_info_cache');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error('Failed to load user info from cache:', error);
    }
    return {};
  };

  // 保存用户信息到localStorage
  const saveUserInfoToCache = (userInfo: Record<string, { location?: string; company?: string }>) => {
    try {
      const existing = loadUserInfoFromCache();
      const merged = { ...existing, ...userInfo };
      localStorage.setItem('github_user_info_cache', JSON.stringify(merged));
    } catch (error) {
      console.error('Failed to save user info to cache:', error);
    }
  };

  // 获取GitHub用户信息（优先从缓存获取）
  const fetchGitHubUserInfo = async (userName: string) => {
    // 先检查缓存
    const cached = loadUserInfoFromCache();
    if (cached[userName]) {
      return cached[userName];
    }
    
    // 再检查内存状态
    const currentInfo = userInfoMap[userName];
    if (currentInfo && (currentInfo.location || currentInfo.company)) {
      return currentInfo;
    }
    
    // 从API获取
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      if (response.ok) {
        const data = await response.json();
        const userInfo = {
          location: data.location || '',
          company: data.company || '',
        };
        // 保存到缓存和状态
        saveUserInfoToCache({ [userName]: userInfo });
        return userInfo;
      }
    } catch (error) {
      console.error('Failed to fetch GitHub user info:', error);
    }
    return { location: '', company: '' };
  };

  // 批量获取当前页用户的GitHub信息（顺序调用，每次sleep 50ms）
  const fetchContributorsUserInfo = async (contributorsList: typeof contributors) => {
    const newUserInfoMap: Record<string, { location?: string; company?: string }> = {};
    const cached = loadUserInfoFromCache();
    
    for (const contributor of contributorsList) {
      // 只获取GitHub平台的用户信息
      if (contributor.platform === 'GitHub') {
        // 检查缓存中是否有该用户的信息
        let userInfo = cached[contributor.name];
        
        // 缓存中没有，从API获取
        if (!userInfo || (!userInfo.location && !userInfo.company)) {
          userInfo = await fetchGitHubUserInfo(contributor.name);
          // 每次调用后sleep 50ms
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        // 只有当用户信息不为空时才添加到状态
        if (userInfo && (userInfo.location || userInfo.company)) {
          newUserInfoMap[contributor.name] = userInfo;
        }
      }
    }
    
    if (Object.keys(newUserInfoMap).length > 0) {
      setUserInfoMap(prev => ({ ...prev, ...newUserInfoMap }));
    }
  };

  // 初始化时加载缓存的用户信息到状态
  useEffect(() => {
    const cached = loadUserInfoFromCache();
    if (Object.keys(cached).length > 0) {
      setUserInfoMap(cached);
    }
  }, []);

  // 初始化数据（只加载一次）
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const projectData = await fetchProjectData(projectName, timeRangeType, initialSelectedYear, initialSelectedMonth);
      setData(projectData);
      setContributors(projectData['contributorsPage']);
      setAllContributors(projectData['contributors']);
      setContributorsRawData(projectData['contributorsResponseRaw'] || {});

      // 获取贡献者数据的最新日期（从传入日期向前查找最近的yyyy-MM格式的key）
      const contributorsResponse = projectData['contributorsResponseRaw'] || {};
      const keys = Object.keys(contributorsResponse).filter(k => /^\d{4}-\d{2}$/.test(k)).sort();

      if (keys.length > 0) {
        // 找到最大日期
        const latestKey = keys[keys.length - 1];
        const maxDate = dayjs(latestKey, "YYYY-MM");
        setMaxContributorDate(maxDate);

        // 如果传入的日期大于最新日期，则调整
        const inputDate = dayjs(`${initialSelectedYear}-${initialSelectedMonth}`, "YYYY-MM");
        if (inputDate.isAfter(maxDate)) {
          setSelectedYear(maxDate.format("YYYY"));
          setSelectedMonth(maxDate.format("MM"));
        } else {
          // 设置默认时间为传入的时间
          const contributorDate = projectData['contributorDate'].split('-');
          setSelectedYear(contributorDate[0]);
          setSelectedMonth(contributorDate.length > 0 ? contributorDate[1] : initialSelectedMonth);
        }
      } else {
        // 没有数据时使用传入时间
        const contributorDate = projectData['contributorDate'].split('-');
        setSelectedYear(contributorDate[0]);
        setSelectedMonth(contributorDate.length > 0 ? contributorDate[1] : initialSelectedMonth);
      }

      setLoading(false);
    };
    loadData();

  }, [projectName]);

  // 时间类型切换处理函数 - 使用缓存的原始数据重新筛选
  const handleTimeRangeTypeChange = (newTimeRangeType: "month" | "year") => {
    if (!data) return;

    setTimeRangeType(newTimeRangeType);

    // 获取最新key的函数（根据时间类型过滤YYYY或YYYY-MM格式，然后排序取最大）
    const latestKey = (rawData: Record<string, any>): string | null => {
      const keys = Object.keys(rawData || {});
      let filteredKeys: string[];
      if (newTimeRangeType === "month") {
        // 过滤 YYYY-MM 格式
        filteredKeys = keys.filter(k => /^\d{4}-\d{2}$/.test(k));
      } else {
        // 过滤 YYYY 格式
        filteredKeys = keys.filter(k => /^\d{4}$/.test(k));
      }
      if (filteredKeys.length === 0) return null;
      // 排序取最大的key
      return filteredKeys.sort().pop() || null;
    };

    // 年度转月度时，使用当前年份的最新月份数据
    let currentKey: string;
    if (timeRangeType === "year" && newTimeRangeType === "month") {
      // 年度转月度：取当前年的最新月份数据
      // 分别获取每个接口的最新key
      const openrankLatest = latestKey(data.rawOpenrank || {});
      const activityLatest = latestKey(data.rawActivity || {});
      const participantsLatest = latestKey(data.rawParticipants || {});
      const issuesLatest = latestKey(data.rawIssues || {});
      const contributorsLatest = latestKey(data.rawContributors || {});

      // 使用最新月份作为当前的key（优先使用贡献者数据的最新月份作为参考）
      currentKey = contributorsLatest || openrankLatest || `${selectedYear}-01`;

      // 更新日期选择器的年月值
      const match = currentKey.match(/^(\d{4})-(\d{2})$/);
      if (match) {
        setSelectedYear(match[1]);
        setSelectedMonth(match[2]);
      }
    } else {
      const currentMonth = `${selectedYear}-${selectedMonth}`;
      currentKey = newTimeRangeType === "year" ? selectedYear : currentMonth;
    }

    const currentDate = dayjs(newTimeRangeType === "year" ? selectedYear : currentKey, newTimeRangeType === "year" ? "YYYY" : "YYYY-MM");

    // 计算前一时期
    let prevPeriod: string;
    let prevPrePeriod: string;
    if (newTimeRangeType === "year") {
      prevPeriod = currentDate.subtract(1, 'year').format('YYYY');
      prevPrePeriod = currentDate.subtract(2, 'year').format('YYYY');
    } else {
      prevPeriod = currentDate.subtract(1, 'month').format('YYYY-MM');
      prevPrePeriod = currentDate.subtract(2, 'month').format('YYYY-MM');
    }
    
    // 筛选原始数据
    const filterByTimeRange = (rawData: Record<string, number>) => {
      const result: Record<string, number> = {};
      for (const [key, value] of Object.entries(rawData)) {
        if (newTimeRangeType === "month") {
          if (/^\d{4}-\d{2}$/.test(key)) {
            result[key] = value;
          }
        } else {
          if (/^\d{4}$/.test(key)) {
            result[key] = value;
          }
        }
      }
      return result;
    };
    
    const openrankData = filterByTimeRange(data.rawOpenrank || {});
    const activityData = filterByTimeRange(data.rawActivity || {});
    const participantsData = filterByTimeRange(data.rawParticipants || {});
    const issuesData = filterByTimeRange(data.rawIssues || {});
    
    // 处理历史数据
    const openrankHistory = Object.entries(openrankData).map(([date, value]) => ({ date, value }));
    const activityHistory = Object.entries(activityData).map(([date, value]) => ({ date, value }));
    const participantsHistory = Object.entries(participantsData).map(([date, value]) => ({ date, value }));
    const issueCountHistory = Object.entries(issuesData).map(([date, value]) => ({ date, value }));

    // 年度模式且只有一个数据点时，添加前后假数据点（key为年份，value为0）
    const addMockDataForYear = (history: { date: string; value: number }[]) => {
      if (newTimeRangeType === "year" && history.length === 1) {
        const existingKey = history[0].date;
        const prevKey = String(parseInt(existingKey) );
        const nextKey = String(parseInt(existingKey) );
        return [
          { date: prevKey, value: 0 },
          ...history,
          { date: nextKey, value: 0 },
        ];
      }
      return history;
    };

    const openrankHistoryFinal = addMockDataForYear(openrankHistory);
    const activityHistoryFinal = addMockDataForYear(activityHistory);
    const participantsHistoryFinal = addMockDataForYear(participantsHistory);
    const issueCountHistoryFinal = addMockDataForYear(issueCountHistory);

    // 年度转月度时，使用各自的最新key
    let openrankLatestKey = currentKey;
    let activityLatestKey = currentKey;
    let participantsLatestKey = currentKey;
    let issuesLatestKey = currentKey;

    if (timeRangeType === "year" && newTimeRangeType === "month") {
      openrankLatestKey = latestKey(data.rawOpenrank || {}) || openrankLatestKey;
      activityLatestKey = latestKey(data.rawActivity || {}) || activityLatestKey;
      participantsLatestKey = latestKey(data.rawParticipants || {}) || participantsLatestKey;
      issuesLatestKey = latestKey(data.rawIssues || {}) || issuesLatestKey;
    }

    // 当前值 - 使用各自的最新key
    const currentOpenrank = openrankData[openrankLatestKey] || 0;
    const prevOpenrank = openrankData[prevPeriod] || 0;
    const currentActivity = activityData[activityLatestKey] || 0;
    const prevActivity = activityData[prevPeriod] || 0;
    const currentParticipants = participantsData[participantsLatestKey] || 0;
    const prevParticipants = participantsData[prevPeriod] || 0;
    
    // 处理贡献者数据
    const contributorsResponse = data.rawContributors || {};
    
    // 年度转月度时，获取贡献者数据的最新key
    let contributorDate = currentKey;
    if (timeRangeType === "year" && newTimeRangeType === "month") {
      const contributorsLatestKey = latestKey(contributorsResponse);
      if (contributorsLatestKey) {
        contributorDate = contributorsLatestKey;
        // 计算贡献者数据的前一期（当前期的前一个月）
        const contributorPrevDate = dayjs(contributorDate, "YYYY-MM").subtract(1, 'month').format('YYYY-MM');
        prevPeriod = contributorPrevDate;
        prevPrePeriod = dayjs(contributorDate, "YYYY-MM").subtract(2, 'month').format('YYYY-MM');
      }
    }
    
    if (!contributorsResponse[contributorDate]) {
      contributorDate = prevPeriod;
    }
    
    const contributorsData = contributorsResponse[contributorDate] || [];
    const prevContributorMap = new Map<string, { rank: number; openrank: number }>();
    const prevContributorData = contributorsResponse[contributorDate] 
      ? contributorsResponse[prevPeriod] 
      : contributorsResponse[prevPrePeriod];
    
    if (prevContributorData) {
      prevContributorData.forEach((item: any, index: number) => {
        prevContributorMap.set(item[2], { rank: index + 1, openrank: item[3] || 0 });
      });
    }
    
    const getUserAvatar = (platform: string, name: string): string => {
      if (!name) return '';
      if (platform === 'Gitee' || platform === 'AtomGit') {
        return `https://gitee.com/${name}/avatar`;
      }
      return `https://avatars.githubusercontent.com/${name}?v=4`;
    };
    
    const allContributorsProcessed = contributorsData.map((item: any, index: number) => {
      const platform = item[0];
      const currentOpenrankVal = item[3] || 0;
      const prevData = prevContributorMap.get(item[2]);
      const prevRank = prevData?.rank || 0;
      const prevOpenrankVal = prevData?.openrank || 0;
      return {
        rank: index + 1,
        prevRank: prevRank,
        name: item[2] || '',
        platform: platform,
        avatar: getUserAvatar(platform, item[2]),
        openrank: currentOpenrankVal,
        prevOpenrank: prevOpenrankVal,
        profileUrl: getProfileUrl(platform, item[2]),
      };
    });
    
    // 更新数据
    setData({
      ...data,
      currentOpenrank,
      prevOpenrank,
      currentActivity,
      prevActivity,
      currentParticipants,
      prevParticipants,
      openrankHistory: openrankHistoryFinal,
      activityHistory: activityHistoryFinal,
      participantsHistory: participantsHistoryFinal,
      issueCountHistory: issueCountHistoryFinal,
      contributors: allContributorsProcessed,
      contributorsPage: allContributorsProcessed.slice(0, 10),
      contributorDate,
      contributorsResponseRaw: contributorsResponse,
    });
    setAllContributors(allContributorsProcessed);
    setContributors(allContributorsProcessed.slice(0, 10));
    setContributorsRawData(contributorsResponse);
    setCurrentPage(1);
  };

  // 日期变化处理函数（重新筛选贡献者数据）
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date || !data?.contributorsResponseRaw) return;
    
    let newYear: string;
    let newMonth: string;
    let currentKey: string;
    
    if (timeRangeType === "year") {
      newYear = String(date.year());
      currentKey = newYear;
    } else {
      newYear = String(date.year());
      newMonth = String(date.month() + 1).padStart(2, "0");
      currentKey = `${newYear}-${newMonth}`;
    }
    
    // 更新日期选择器的值
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
    
    // 获取贡献者原始数据
    const contributorsResponse = data.contributorsResponseRaw;
    
    // 计算前一时期
    let prevPeriod: string;
    let prevPrePeriod: string;
    const currentDate = timeRangeType === "year" 
      ? dayjs(currentKey, "YYYY")
      : dayjs(currentKey, "YYYY-MM");
    
    if (timeRangeType === "year") {
      prevPeriod = currentDate.subtract(1, 'year').format('YYYY');
      prevPrePeriod = currentDate.subtract(2, 'year').format('YYYY');
    } else {
      prevPeriod = currentDate.subtract(1, 'month').format('YYYY-MM');
      prevPrePeriod = currentDate.subtract(2, 'month').format('YYYY-MM');
    }
    
    // 确定使用哪个日期的数据
    let contributorDate = currentKey;
    if (!contributorsResponse[currentKey]) {
      contributorDate = prevPeriod;
    }
    
    // 获取当前期数据
    const contributorsData = contributorsResponse[contributorDate] || [];
    
    // 构建前一期的排名和openrank映射
    const prevContributorMap = new Map<string, { rank: number; openrank: number }>();
    const prevContributorData = contributorsResponse[currentKey] 
      ? contributorsResponse[prevPeriod] 
      : contributorsResponse[prevPrePeriod];
    
    if (prevContributorData) {
      prevContributorData.forEach((item: any, index: number) => {
        prevContributorMap.set(item[2], { rank: index + 1, openrank: item[3] || 0 });
      });
    }
    
    const getUserAvatar = (platform: string, name: string): string => {
      if (!name) return '';
      if (platform === 'Gitee' || platform === 'AtomGit') {
        return `https://gitee.com/${name}/avatar`;
      }
      return `https://avatars.githubusercontent.com/${name}?v=4`;
    };
    
    // 处理所有贡献者数据
    const allContributorsProcessed = contributorsData.map((item: any, index: number) => {
      const platform = item[0];
      const currentOpenrank = item[3] || 0;
      const prevData = prevContributorMap.get(item[2]);
      const prevRank = prevData?.rank || 0;
      const prevOpenrank = prevData?.openrank || 0;
      const currentRank = index + 1;
      return {
        rank: currentRank,
        prevRank: prevRank,
        name: item[2] || '',
        platform: platform,
        avatar: getUserAvatar(platform, item[2]),
        openrank: currentOpenrank,
        prevOpenrank: prevOpenrank,
        profileUrl: getProfileUrl(platform, item[2]),
      };
    });
    
    setAllContributors(allContributorsProcessed);
    setContributors(allContributorsProcessed.slice(0, 10));
    setCurrentPage(1);
  };


  // 分页变化时更新表格数据
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const newContributors = allContributors.slice(start, end);
    setContributors(newContributors);
    
    // 获取新页面的GitHub用户信息
    fetchContributorsUserInfo(newContributors);
  }, [currentPage, allContributors, pageSize]);

  const handleBack = () => {
    onBack();
  };

  const handleUserClick = (userName: string, userAvatar: string, platform: string = 'GitHub') => {
    setSelectedUser(userName);
    setSelectedUserAvatar(userAvatar);
    setSelectedUserPlatform(platform);
  };

  const handleUserBack = () => {
    setSelectedUser(null);
  };

  // 渲染用户详情 - 传递时间类型和日期参数
  if (selectedUser) {
    return (
      <UserDetail 
        userName={selectedUser} 
        userAvatar={selectedUserAvatar} 
        platform={selectedUserPlatform} 
        timeRangeType={timeRangeType}
        selectedYear={selectedYear}
        selectedMonth={timeRangeType === "month" ? selectedMonth : undefined}
        onBack={handleUserBack} 
      />
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.errorContainer}>
        <p>Project Data Not Found</p>
        <button onClick={handleBack} className={styles.backButton}>Back</button>
      </div>
    );
  }

  return (
    <div className={styles.projectDetailContainer}>
      {/* 返回按钮 */}
      <button className={styles.backButton} onClick={handleBack}>
        ← Back
      </button>

      {/* 第1部分：项目简介 */}
      <div className={styles.projectIntroSection}>
        <div className={styles.projectIntroLeft}>
          <ProjectLogo name={data.name} logo={projectAvatar || data.logo} className={styles.projectIntroLogo} />
        </div>
        <div className={styles.projectIntroRight}>
          <div className={styles.projectTitleRow}>
            <h1 className={styles.projectIntroTitle}>{data.name}</h1>
            <div className={styles.projectIntroTags}>
              {data.tags.map((tag, index) => (
                <span key={index} className={styles.projectTag}>{tag}</span>
              ))}
            </div>
          </div>
          <p className={styles.projectIntroDesc}>{ data.description}</p>
        </div>
      </div>

      {/* 第2部分：基本数据统计 */}
      <div className={styles.statsSection}>
        <div className={styles.statsSectionHeader}>
          <h2 className={styles.sectionTitle}>Basic Statistics</h2>
          <div className={styles.timeSelector}>
            <div className={styles.tabButtonsSmall}>
              <button
                className={clsx(styles.tabButtonSmall, timeRangeType === "month" && styles.tabButtonSmallActive)}
                onClick={() => handleTimeRangeTypeChange("month")}
              >
                Monthly
              </button>
              <button
                className={clsx(styles.tabButtonSmall, timeRangeType === "year" && styles.tabButtonSmallActive)}
                onClick={() => handleTimeRangeTypeChange("year")}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className={styles.statsCards}>
          <div className={styles.statCardLarge}>
            <div className={styles.statCardContent}>
              <div className={styles.statCardLeft}>
                <div className={styles.statValueRow}>
                  <div className={styles.statIconWrapper}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentOpenrank?.toFixed(2) || '0.00'}</span>
                </div>
                <span className={styles.statLabel}>OpenRank({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentOpenrank} previous={data.prevOpenrank} />
              </div>
            </div>
          </div>
          <div className={styles.statCardLarge}>
            <div className={styles.statCardContent}>
              <div className={styles.statCardLeft}>
                <div className={styles.statValueRow}>
                  <div className={styles.statIconWrapper} style={{ background: '#fef3c7', color: '#d97706' }}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentParticipants?.toLocaleString() || 0}</span>
                </div>
                <span className={styles.statLabel}>Developers({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentParticipants} previous={data.prevParticipants} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第3部分：历史数据趋势 */}
      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>Historical Trends</h2>
        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>OpenRank History</div>
            <LineChart data={data.openrankHistory} color="#22c55e" timeRangeType={timeRangeType}/>
          </div>
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Developers History</div>
            <LineChart data={data.participantsHistory} color="#f59e0b" timeRangeType={timeRangeType}/>
          </div>
        </div>
      </div>

      {/* 第4部分：社区开发者贡献度 */}
      <div className={styles.contributorsSection}>
        <div className={styles.contributorsSectionHeader}>
          <h2 className={styles.sectionTitle}>Contributor Rankings</h2>
          <div className={styles.contributorsListControls}>
            <DatePicker
                value={timeRangeType === "month"
                    ? dayjs(`${selectedYear}-${selectedMonth}`, "YYYY-MM")
                    : dayjs(selectedYear, "YYYY")
                }
                format={timeRangeType === "month" ? "YYYY-MM" : "YYYY"}
                picker={timeRangeType}
                onChange={handleDateChange}
                style={{ width: '120px', height: '36px' }}
                popupClassName="custom-date-picker-popup"
                disabledDate={(current) => {
                  return maxContributorDate ? current && current > maxContributorDate : false;
                }}
            />
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <span className={styles.paginationInfo}>
                {currentPage} / {Math.ceil(allContributors.length / pageSize) || 1}
              </span>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(allContributors.length / pageSize), p + 1))}
                disabled={currentPage >= Math.ceil(allContributors.length / pageSize)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
        <table className={styles.contributorsTable}>
          <tr>
            <th className={styles.rankColumn}>Rank</th>
            <th>User</th>
            <th>Dashboard</th>
            <th>OpenRank</th>
            <th className={styles.changeColumn}>Change</th>
          </tr>
          <tbody>
            {contributors.map((contributor) => {
              const userInfo = userInfoMap[contributor.name] || {};
              const showUserInfo = contributor.platform === 'GitHub';
              
              return (
                <tr key={contributor.rank}>
                  <td className={styles.rankColumn}>
                    <RankWithChange rank={contributor.rank} prevRank={contributor.prevRank} />
                  </td>
                  <td>
                    <div className={styles.contributorInfo}>
                      <div className={styles.contributorUserBlock}>
                        <UserAvatar name={contributor.name} avatar={contributor.avatar} className={styles.contributorAvatar}/>
                        <a href={contributor.profileUrl} target="_blank" rel="noopener noreferrer"
                           className={styles.contributorName}>
                          {contributor.name}
                        </a>
                      </div>
                      {showUserInfo && (userInfo.location || userInfo.company) && (
                        <div className={styles.contributorMetaBlock}>
                          {userInfo.location && (
                            <span className={styles.contributorLocation}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                              {userInfo.location}
                            </span>
                          )}
                          {userInfo.company && (
                            <span className={styles.contributorCompany}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
                              </svg>
                              {userInfo.company}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                        className={styles.userDashboardButton}
                        onClick={() => handleUserClick(contributor.name, contributor.avatar, contributor.platform)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </button>
                  </td>
                  <td className={styles.contributorOpenrank}>{contributor.openrank?.toFixed(2) || '0.00'}</td>
                  <td className={styles.changeColumn}>
                    <ChangeIndicator current={contributor.openrank} previous={contributor.prevOpenrank}/>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 第5部分：贡献度分布（近一年） */}
       {data && data.countryDistribution && data.countryDistribution.length > 0 && (
      <div className={styles.countryDistributionSection}>
        <h2 className={styles.sectionTitle}>Contribution Distribution (Past Year)</h2>
        <div className={styles.countryDistributionContent}>
          <div className={styles.countryDistributionList}>
            <div className={styles.countryListHeader}>
              <span className={styles.countryListCol1}>#</span>
              <span className={styles.countryListCol2}>Country</span>
              <span className={styles.countryListCol3}>Developers</span>
              <span className={styles.countryListCol4}>OpenRank</span>
            </div>
            {data.countryDistribution.map((item) => (
              <div key={item.rank} className={styles.countryListItem}>
                <span className={styles.countryListCol1}>{item.rank}</span>
                <span className={styles.countryListCol2}>
                  <span className={styles.countryFlag}>{item.flag}</span>
                  <span className={styles.countryName}>{item.country}</span>
                </span>
                <span className={styles.countryListCol3}>{(item.developers ?? 0).toLocaleString()}</span>
                <span className={styles.countryListCol4}>{(item.openrank ?? 0).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className={styles.countryMapContainer}>
            <CountryMapChart data={data.countryDistribution} />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
