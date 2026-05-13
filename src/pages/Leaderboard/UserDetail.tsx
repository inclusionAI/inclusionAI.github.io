import React, { useState, useEffect } from "react";
import { Spin } from 'antd';
import dayjs from "dayjs";
import clsx from "clsx";
import styles from "../research.module.css";

const OSS_BASE_URL = "https://oss.open-digger.cn";

// 设置 Day.js 使用中文

// 用户详情数据接口
interface UserDetailData {
  name: string;
  login: string;
  avatar: string;
  bio: string;
  location: string;
  company: string;
  platform: string;
  profileUrl: string;
  currentOpenrank: number;
  prevOpenrank: number;
  currentActivity: number;
  prevActivity: number;
  currentIssueCount: number;
  prevIssueCount: number;
  currentIssueCommentCount: number;
  prevIssueCommentCount: number;
  currentPrCount: number;
  prevPrCount: number;
  currentPrReviewCount: number;
  prevPrReviewCount: number;
  // 历史数据
  openrankHistory: { date: string; value: number }[];
  activityHistory: { date: string; value: number }[];
  issueCountHistory: { date: string; value: number }[];
  prCountHistory: { date: string; value: number }[];
}

// 生成历史数据
function generateHistoryData(baseValue: number, months: number, variance: number): { date: string; value: number }[] {
  const data = [];
  let value = baseValue * 0.8;
  const now = dayjs();
  for (let i = months - 1; i >= 0; i--) {
    const date = now.subtract(i, 'month').format('YYYY-MM');
    value = value + (Math.random() - 0.4) * variance;
    value = Math.max(baseValue * 0.5, Math.min(baseValue * 1.2, value));
    data.push({ date, value: Math.round(value * 10) / 10 });
  }
  return data;
}



// 根据平台生成用户个人主页URL
function getProfileUrl(platform: string, userLogin: string): string {
  if (!userLogin) return '';
  if (platform === 'Gitee') {
    // Gitee 和 AtomGit 都使用 gitee.com
    return `https://gitee.com/${userLogin}`;
  }
  else if (platform === 'AtomGit') {
    return `https://atomgit.com/${userLogin}`;
  }
  else if (platform === 'GitHub') {
    return `https://github.com/${userLogin}`;
  }
  return '';
}

// 从API获取用户真实数据
async function fetchUserData(
  userName: string, 
  platform: string = 'GitHub', 
  timeRangeType: "month" | "year" = "month",
  selectedYear?: string,
  selectedMonth?: string
): Promise<UserDetailData> {
  const platformLower = platform.toLowerCase();
  const basePath = `${OSS_BASE_URL}/${platformLower}/${userName}`;
  const metaUrl = `${basePath}/meta.json`;
  const openrankUrl = `${basePath}/openrank.json`;
  const activityUrl = `${basePath}/activity.json`;
  const openIssueUrl = `${basePath}/open_issue.json`;
  const issueCommentUrl = `${basePath}/issue_comment.json`;
  const openPrUrl = `${basePath}/open_pull.json`;
  const reviewCommentUrl = `${basePath}/review_comment.json`;

  // 并行请求所有数据
  const [metaRes, openrankRes, activityRes, openIssueRes, issueCommentRes, openPrRes, reviewCommentRes] = await Promise.all([
    fetch(metaUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    fetch(openrankUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    fetch(activityUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    fetch(openIssueUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    fetch(issueCommentUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    fetch(openPrUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    fetch(reviewCommentUrl).then(r => r.ok ? r.json() : {}).catch(() => ({})),
  ]);

  // 根据时间范围类型过滤数据
  const filterByTimeRange = (data: Record<string, number>, type: "month" | "year"): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(data)) {
      if (type === "month") {
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

  // 过滤各数据源
  const filteredOpenrank = filterByTimeRange(openrankRes, timeRangeType);
  const filteredActivity = filterByTimeRange(activityRes, timeRangeType);
  const filteredOpenIssue = filterByTimeRange(openIssueRes, timeRangeType);
  const filteredIssueComment = filterByTimeRange(issueCommentRes, timeRangeType);
  const filteredOpenPr = filterByTimeRange(openPrRes, timeRangeType);
  const filteredReviewComment = filterByTimeRange(reviewCommentRes, timeRangeType);

  // 获取当前周期（根据传入的日期或默认日期）
  const getCurrentPeriod = () => {
    if (timeRangeType === "year") {
      // 年度模式：优先使用传入的年份，否则使用当前年份的前一年
      if (selectedYear) {
        return selectedYear;
      }
      return dayjs().subtract(1, 'year').format('YYYY');
    } else {
      // 月度模式：优先使用传入的年份和月份，否则使用当前月份的前一个月
      if (selectedYear && selectedMonth) {
        return `${selectedYear}-${selectedMonth}`;
      }
      return dayjs().subtract(1, 'month').format('YYYY-MM');
    }
  };

  const prevMonth = getCurrentPeriod();

  // 从meta获取用户信息
  const meta = metaRes as any;
  const userInfo = meta?.info || {};
  
  // 获取当前周期和上一周期的数据
  const getCurrentAndPrev = (data: Record<string, number>) => {
    const current = data[prevMonth] || 0;
    const entries = Object.entries(data).filter(entry => entry[0] < prevMonth);
    const prev = entries.length > 0 
      ? entries.sort((a, b) => b[0].localeCompare(a[0]))[0][1]
      : 0;
    return { current, prev };
  };

  // 获取Issue数据特殊处理：当前值取前2个月，变化量取前2个月减去前3个月
  const getIssueCountData = () => {
    const now = dayjs();
    // 当前显示的月份（本月-1）
    // 前1个月 = 当前显示的上个月（即前2个月）
    const prev1Month = now.subtract(2, 'month').format('YYYY-MM');
    // 前2个月 = 当前显示的上上个月（即前3个月）
    const prev2Month = now.subtract(3, 'month').format('YYYY-MM');
    
    const current = filteredOpenIssue[prev1Month] || 0;
    const prev =  (filteredOpenIssue[prev2Month] || 0);
    return { current, prev };
  };

  const openrankData = getCurrentAndPrev(filteredOpenrank);
  const activityData = getCurrentAndPrev(filteredActivity);
  const issueCountData = getIssueCountData();
  const issueCommentData = getCurrentAndPrev(filteredIssueComment);
  const prCountData = getCurrentAndPrev(filteredOpenPr);
  const prReviewData = getCurrentAndPrev(filteredReviewComment);

  // 转换历史数据格式
  const convertHistory = (dataObj: Record<string, number>) => {
    if (!dataObj) return [];
    return Object.entries(dataObj)
      .map(([date, value]) => ({ date, value: value || 0 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  return {
    name: userInfo.name || userName,
    login: userName,
    avatar: `https://avatars.githubusercontent.com/u/${meta?.id}?v=4`,
    bio: userInfo.bio || '',
    location: userInfo.location || '',
    company: userInfo.company || '',
    platform: platform,
    profileUrl: getProfileUrl(platform, userName),
    currentOpenrank: openrankData.current,
    prevOpenrank: openrankData.prev,
    currentActivity: activityData.current,
    prevActivity: activityData.prev,
    currentIssueCount: issueCountData.current,
    prevIssueCount: issueCountData.prev,
    currentIssueCommentCount: issueCommentData.current,
    prevIssueCommentCount: issueCommentData.prev,
    currentPrCount: prCountData.current,
    prevPrCount: prCountData.prev,
    currentPrReviewCount: prReviewData.current,
    prevPrReviewCount: prReviewData.prev,
    openrankHistory: convertHistory(filteredOpenrank),
    activityHistory: convertHistory(filteredActivity),
    issueCountHistory: convertHistory(filteredOpenIssue),
    prCountHistory: convertHistory(filteredOpenPr),
  };
}

function getMockUserData(userName: string): UserDetailData {
  return {
    name: userName,
    login: userName,
    avatar: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100)}?v=1`,
    bio: "Open source contributor and developer",
    location: '',
    company: '',
    platform: "GitHub",
    profileUrl: `https://github.com/${userName}`,
    currentOpenrank: 45.2,
    prevOpenrank: 42.1,
    currentActivity: 92,
    prevActivity: 88,
    currentIssueCount: 28,
    prevIssueCount: 22,
    currentIssueCommentCount: 156,
    prevIssueCommentCount: 142,
    currentPrCount: 15,
    prevPrCount: 12,
    currentPrReviewCount: 32,
    prevPrReviewCount: 28,
    openrankHistory: generateHistoryData(45, 15, 5),
    activityHistory: generateHistoryData(90, 15, 8),
    issueCountHistory: generateHistoryData(25, 15, 5),
    prCountHistory: generateHistoryData(14, 15, 3),
  };
}

// 排名变化指示器
function ChangeIndicator({ current, previous }: { current: number; previous: number }) {
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
  
  // 生成基于用户名的固定颜色（与列表保持一致）
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
        fontSize: '36px',
        borderRadius: '12px'
      }}
    >
      {initial}
    </div>
  );
}

// 平台图标组件
    function PlatformIcon({ platform }: { platform: string }) {
      if (platform === 'GitHub') {
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      } else if (platform === 'Gitee' || platform === 'AtomGit') {
        return (
          <svg viewBox="0 0 1024 1024" width="16" height="16">
            <path d="M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z" fill="#C71D23"/>
            <path d="M762.538667 457.045333h-281.088a24.4736 24.4736 0 0 0-24.439467 24.405334v61.098666c-0.034133 13.5168 10.922667 24.439467 24.405333 24.439467h171.1104c13.5168 0 24.439467 10.922667 24.439467 24.439467v12.219733a73.3184 73.3184 0 0 1-73.3184 73.3184h-232.209067a24.439467 24.439467 0 0 1-24.439466-24.439467v-232.174933a73.3184 73.3184 0 0 1 73.3184-73.3184h342.152533c13.482667 0 24.405333-10.922667 24.439467-24.439467l0.034133-61.098666a24.405333 24.405333 0 0 0-24.405333-24.439467H420.352a183.296 183.296 0 0 0-183.296 183.296V762.538667c0 13.482667 10.922667 24.439467 24.405333 24.439466h360.516267a164.9664 164.9664 0 0 0 165.000533-165.000533v-140.526933a24.439467 24.439467 0 0 0-24.439466-24.439467z" fill="#FFFFFF"/>
          </svg>
        );
      }
      return <span>{platform}</span>;
    }

    // 折线图组件 - 细线折线图
    function LineChart({ data, color = "#22c55e", unit = "", timeRangeType = "month" }: { data: { date: string; value: number }[]; color?: string; unit?: string; timeRangeType?: "month" | "year" }) {
      if (!data || data.length === 0) return null;
    
      const values = data.map(d => d.value);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      const range = maxValue - minValue || 1;
    
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

        // 确保覆盖最大值
        if (ticks[ticks.length - 1] < max) {
          ticks[ticks.length - 1] = Math.ceil(max / niceStep) * niceStep;
        }

        return ticks;
      };

      const yAxisValues = getNiceScaleValues(minValue, maxValue, 5).reverse();
    
      // X轴日期格式：月度显示4位年份(如2023-05)，年度显示4位年份(如2023)
      const formatXAxisDate = (date: string) => {
        return date; // 月度和年度都显示完整的4位年份
      };
    
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
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,100 ${points} 100,100`}
              fill={`url(#gradient-${color.replace('#', '')})`}
            />
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* X轴刻度文字 - 只显示第一条和最后一条 */}
          <div className={styles.lineChartXAxis}>
            {data.length > 0 && (
              <>
                <span>{formatXAxisDate(data[0].date)}</span>
                {data.length > 1 && <span style={{ marginLeft: 'auto' }}>{formatXAxisDate(data[data.length - 1].date)}</span>}
              </>
            )}
          </div>
        </div>
      );
    }

export default function UserDetail({
  userName,
  userAvatar,
  platform = 'GitHub',
  timeRangeType: initialTimeRangeType,
  selectedYear: initialSelectedYear,
  selectedMonth: initialSelectedMonth,
  onBack
}: { 
  userName: string; 
  userAvatar?: string;
  platform?: string;
  timeRangeType?: "month" | "year";
  selectedYear?: string;
  selectedMonth?: string;
  onBack: () => void 
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserDetailData | null>(null);
  const [timeRangeType, setTimeRangeType] = useState<"month" | "year">(initialTimeRangeType || "month");
  const [selectedYear, setSelectedYear] = useState<string>(initialSelectedYear || dayjs().format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState<string>(initialSelectedMonth || dayjs().format("MM"));

  // 初始化数据，根据传入的日期获取数据
  useEffect(() => {
    if (userName) {
      setLoading(true);
      // 使用真实API获取数据，根据timeRangeType和选择的日期
      fetchUserData(userName, platform, timeRangeType, selectedYear, selectedMonth)
        .then(userData => {
          setData(userData);
          setLoading(false);
        })
        .catch(() => {
          // 如果API请求失败，使用mock数据
          setData(getMockUserData(userName));
          setLoading(false);
        });
    }
  }, [userName, platform, timeRangeType, selectedYear, selectedMonth]);

  // 时间类型切换时，同时更新日期
  const handleTimeRangeTypeChange = (newTimeRangeType: "month" | "year") => {
    setTimeRangeType(newTimeRangeType);
    // 如果切换到月度模式，需要重新计算当前月份
    if (newTimeRangeType === "month") {
      // 默认使用当前年月的前一个月
      const prevMonth = dayjs().subtract(1, 'month');
      setSelectedYear(prevMonth.format("YYYY"));
      setSelectedMonth(prevMonth.format("MM"));
    }
  };

  const handleBack = () => {
    onBack();
  };

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
        <p>User Data Not Found</p>
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

      {/* 第1部分：用户简介 */}
      <div className={styles.projectIntroSection}>
        <div className={styles.projectIntroLeft}>
          <UserAvatar name={data.name} avatar={userAvatar || data?.avatar} className={styles.userIntroLogo} />
        </div>
        <div className={styles.projectIntroRight}>
          <div className={styles.userTitleSection}>
            <h1 className={styles.projectIntroTitle}>
              {data.name}
            </h1>
          </div>
          <a 
            href={data.profileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubLinkButton}
          >
            <PlatformIcon platform={data.platform} />
            <span>Developer Profile</span>
          </a>
          
          {/* 简介 */}
          {data.bio && (
            <div className={styles.userMetaItem}>
              <svg className={styles.userMetaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className={styles.userMetaText}>{data.bio}</span>
            </div>
          )}
          
          {/* 所在地和公司合并为一行 */}
          {(data.location || data.company) && (
            <div className={styles.userMetaRow}>
              {data.location && (
                <div className={styles.userMetaItem}>
                  <svg className={styles.userMetaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className={styles.userMetaText}>{data.location}</span>
                </div>
              )}
              {data.location && data.company && <span className={styles.userMetaDivider}>|</span>}
              {data.company && (
                <div className={styles.userMetaItem}>
                  <svg className={styles.userMetaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span className={styles.userMetaText}>{data.company}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 第2部分：基础数据统计 - 上排2个 */}
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

        {/* 第一行：2个指标卡 */}
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
                  <span className={styles.statValueLarge}>{data.currentOpenrank}</span>
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
                  <div className={styles.statIconWrapper} style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentActivity}<span className={styles.statUnit}>%</span></span>
                </div>
                <span className={styles.statLabel}>Activity({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentActivity} previous={data.prevActivity} />
              </div>
            </div>
          </div>
        </div>

        {/* 第二行：4个指标卡 */}
        <div className={styles.statsCards} style={{ marginTop: '16px' }}>
          <div className={styles.statCardLarge}>
            <div className={styles.statCardContent}>
              <div className={styles.statCardLeft}>
                <div className={styles.statValueRow}>
                  <div className={styles.statIconWrapper} style={{ background: '#fce7f3', color: '#db2777' }}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentIssueCount}</span>
                </div>
                <span className={styles.statLabel}>Issues Created({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentIssueCount} previous={data.prevIssueCount} />
              </div>
            </div>
          </div>
          <div className={styles.statCardLarge}>
            <div className={styles.statCardContent}>
              <div className={styles.statCardLeft}>
                <div className={styles.statValueRow}>
                  <div className={styles.statIconWrapper} style={{ background: '#f3e8ff', color: '#9333ea' }}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentIssueCommentCount}</span>
                </div>
                <span className={styles.statLabel}>Issue Comments({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentIssueCommentCount} previous={data.prevIssueCommentCount} />
              </div>
            </div>
          </div>
          <div className={styles.statCardLarge}>
            <div className={styles.statCardContent}>
              <div className={styles.statCardLeft}>
                <div className={styles.statValueRow}>
                  <div className={styles.statIconWrapper} style={{ background: '#dbeafe', color: '#2563eb' }}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                      <line x1="6" y1="9" x2="6" y2="21" />
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentPrCount}</span>
                </div>
                <span className={styles.statLabel}>PR Created({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentPrCount} previous={data.prevPrCount} />
              </div>
            </div>
          </div>
          <div className={styles.statCardLarge}>
            <div className={styles.statCardContent}>
              <div className={styles.statCardLeft}>
                <div className={styles.statValueRow}>
                  <div className={styles.statIconWrapper} style={{background: '#fef3c7', color: '#d97706'}}>
                    <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                  </div>
                  <span className={styles.statValueLarge}>{data.currentPrReviewCount}</span>
                </div>
                <span className={styles.statLabel}>PR Reviews({timeRangeType==='month'?`${selectedYear}-${selectedMonth}`:selectedYear})</span>
              </div>
              <div className={styles.statCardRight}>
                <ChangeIndicator current={data.currentPrReviewCount} previous={data.prevPrReviewCount} />
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
            <div className={styles.chartTitle}>Activity History</div>
            <LineChart data={data.activityHistory} color="#3b82f6" unit="%" timeRangeType={timeRangeType}/>
          </div>
        </div>
      </div>
    </div>
  );
}