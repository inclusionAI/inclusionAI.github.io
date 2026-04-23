import React, { useState, useMemo, useEffect, useRef } from "react";
import { DatePicker, Spin } from 'antd';
import dayjs from "dayjs";
import clsx from "clsx";
import styles from "../research.module.css";
import ProjectDetail from "./ProjectDetail";


// API 基础 URL
const API_BASE_URL = "https://selfoss.open-digger.cn";
const OSS_BASE_URL = "https://oss.open-digger.cn";

// CORS 代理
// const CORS_PROXY = "https://api.allorigins.win/raw?url=";

// 项目列表数据接口
interface LeaderboardItem {
    rank: number;
    rankDelta: number;
    prevRank: number;
    id: string;
    platform: string;
    avatar: string;
    name: string;
    name_zh: string;
    description: string;
    description_zh: string;
    openrank: number;
    openrankDelta: number;
    participants: number;
    participantsDelta: number;
}

// 用户头像组件 - 如果头像不存在，使用随机颜色方块+首字母
function ProjectLogo({ name, avatar, className }: { name: string; avatar?: string; className?: string }) {
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

// Rank badges for top 3
const RANK_BADGES: { [key: number]: string } = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
};

// Helper function for rank change indicators
function RankChange({ current, previous }: { current: number; previous: number }) {
    const diff = previous - current; // 排名上升为正，下降为负

    if (diff === 0) {
        return <span className={styles.rankNoChange}>-</span>;
    }

    const isUp = diff > 0;
    return (
        <span className={clsx(styles.rankChange, isUp ? styles.rankUp : styles.rankDown)}>
      {isUp ? "↑" : "↓"} {Math.abs(diff)}
    </span>
    );
}


// 获取数据并返回
async function fetchLeaderboardDataWithCheck(timeType: "month" | "year", year: string, month: string): Promise<{ data: LeaderboardItem[]; year: string; month: string; found: boolean }> {
    const data = await fetchLeaderboardData(timeType, year, month);
    if (data.length > 0) {
        return { data, year, month, found: true };
    }
    return { data, year, month, found: false };
}

// 找到最近的有数据的月份并返回数据
async function findNearestDataMonthWithData(timeType: "month" | "year", year: string, month: string): Promise<{ data: LeaderboardItem[]; year: string; month: string; found: boolean }> {
    const maxRetries = 3; // 最多往前找3个月
    let currentDate = dayjs(`${year}-${month}`, "YYYY-MM");
    
    for (let i = 0; i <= maxRetries; i++) {
        const currentYear = String(currentDate.year());
        const currentMonth = currentDate.format('MM');
        
        const result = await fetchLeaderboardDataWithCheck(timeType, currentYear, currentMonth);
        
        if (result.found && result.data.length > 0) {
            return result;
        }
        
        // 往前一个月
        currentDate = currentDate.subtract(1, 'month');
    }
    
    // 没找到，返回空数据
    return { data: [], year, month, found: false };
}

// 获取项目列表数据
// 过滤并重新计算排名的辅助函数
const filterAndRecalculateRank = (items: LeaderboardItem[]): LeaderboardItem[] => {
    // 需要过滤的项目ID
    const filteredId = ':companies/huawei/cann';
    
    // 找到需要过滤的项目的rank
    const itemToFilter = items.find(item => item.id === filteredId);
    const filteredRank = itemToFilter ? itemToFilter.rank : null;
    
    // 过滤掉该项目
    const filteredItems = items.filter(item => item.id !== filteredId);

    // 如果找到了要过滤的项目，且它的rank有效，则重新计算排名
    if (filteredRank !== null && filteredRank > 0) {
        return filteredItems.map(item => {
            // 如果项目的排名大于被过滤项目的排名，则排名前进一位（减去1）
            if (item.rank > filteredRank) {
                return { ...item, rank: item.rank - 1 };
            }
            return item;
        });
    }

    
    return filteredItems;
};

async function fetchLeaderboardData(timeType: "month" | "year", year: string, month: string): Promise<LeaderboardItem[]> {
    try {
        const dateStr = timeType === "month" ? `${year}${parseInt(month)}` : year;
        const targetUrl = `${API_BASE_URL}/open_leaderboard/agentic%20ai/project/${timeType}/${dateStr}/data.json`;
        const url = targetUrl;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        const data = json.data || json;

        const items = (Array.isArray(data) ? data : []).map((item: any, index: number) => ({
            rank: item.rank,
            rankDelta: item.rankDelta,
            id: item.id || "",
            platform: item.platform || "All",
            avatar: item.avatar || "",
            name: item.name || "",
            name_zh: item.name_zh || item.name || "",
            description: item.description || "",
            description_zh: item.description_zh || item.description || "",
            openrank: item.openrank || 0,
            openrankDelta: item.openrankDelta || 0,
            participants: item.participants || 0,
            participantsDelta: item.participantsDelta || 0,
        }));
        
        // 过滤指定ID的项目，并重新计算排名
        const filteredItems = filterAndRecalculateRank(items);
        
        return filteredItems;
    } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
        return [];
    }
}

export default function Leaderboard() {
    // 获取上一个月的时间 - SSR 时使用默认值的懒初始化
    const getInitialDate = (): { year: string; month: string } => {
        if (typeof window === 'undefined') {
            return { year: '2026', month: '04' };
        }
        const lastMonth = dayjs().subtract(1, 'month');
        return { 
            year: lastMonth.format("YYYY"), 
            month: lastMonth.format("MM") 
        };
    };

    const [initialDate] = useState(getInitialDate);

    const [timeRangeType, setTimeRangeType] = useState<"month" | "year">("month");
    const [selectedYear, setSelectedYear] = useState(initialDate.year);
    const [selectedMonth, setSelectedMonth] = useState(initialDate.month);
    // 记录实际有数据的年月（可能与用户选择的不同）
    const [actualYear, setActualYear] = useState(initialDate.year);
    const [actualMonth, setActualMonth] = useState(initialDate.month);
    // 最大可选日期（最近有数据的月份）
    const [maxSelectableDate, setMaxSelectableDate] = useState<dayjs.Dayjs | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof LeaderboardItem>("rank");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [selectedProjectAvatar, setSelectedProjectAvatar] = useState<string>('');
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const pageSize = 10;
    
    // 用于标记是否是初始化加载（避免初始化时触发两次请求）
    const isInitialized = useRef(false);

    // 初始化：查找最近有数据的月份并直接返回数据
    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            // 查找最近有数据的月份，直接返回数据
            const result = await findNearestDataMonthWithData(timeRangeType, selectedYear, selectedMonth);

            if (result.found) {
                setSelectedYear(result.year);
                setSelectedMonth(result.month);
                setActualYear(result.year);
                setActualMonth(result.month);
                // 设置最大可选日期为最近有数据的月份
                setMaxSelectableDate(dayjs(`${result.year}-${result.month}`, "YYYY-MM"));
                setLeaderboardData(result.data);
            } else {
                setActualYear(selectedYear);
                setActualMonth(selectedMonth);
                setLeaderboardData(result.data);
            }

            setLoading(false);
            setCurrentPage(1);
            isInitialized.current = true;
        };
        initData();
    }, []);

    // 用户手动切换时间类型
    const handleTimeRangeTypeChange = async (type: "month" | "year") => {
        if (!isInitialized.current) return;
        setTimeRangeType(type);
        setLoading(true);
        const data = await fetchLeaderboardData(type, selectedYear, selectedMonth);
        setActualYear(selectedYear);
        setActualMonth(selectedMonth);
        setLeaderboardData(data);
        setLoading(false);
        setCurrentPage(1);
    };

    // 用户手动选择日期
    const handleDateChange = async (date: dayjs.Dayjs | null) => {
        if (!date || !isInitialized.current) return;
        const year = String(date.year());
        const month = String(date.month() + 1).padStart(2, "0");
        setSelectedYear(year);
        if (timeRangeType === "month") {
            setSelectedMonth(month);
        }
        setLoading(true);
        const data = await fetchLeaderboardData(timeRangeType, year, month);
        setActualYear(year);
        setActualMonth(month);
        setLeaderboardData(data);
        setLoading(false);
        setCurrentPage(1);
    };

    // 发送高度给父页面
    useEffect(() => {
        const sendHeight = () => {
            if (contentRef.current) {
                const height = contentRef.current.scrollHeight;
                window.parent.postMessage({ type: 'leaderboard-height', height }, '*');
            }
        };

        sendHeight();

        const observer = new ResizeObserver(sendHeight);
        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer.disconnect();
    }, [selectedProject, leaderboardData]);

    const filteredData = useMemo(() => {
        return leaderboardData.filter((item) => {
            // Search filter
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });
    }, [searchQuery, leaderboardData]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
            }
            return 0;
        });
    }, [filteredData, sortBy, sortOrder]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage]);

    const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));

    const handleSort = (column: keyof LeaderboardItem) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    const SortIcon = ({ column }: { column: keyof LeaderboardItem }) => {
        if (sortBy !== column) return null;
        return (
            <span className={styles.sortIcon}>
        {sortOrder === "asc" ? "▲" : "▼"}
      </span>
        );
    };

    // 处理项目点击，传递完整项目信息
    const handleProjectClick = (item: LeaderboardItem) => {
        // 使用完整的项目 id
        setSelectedProject(item.id.replace(":",""));
        setSelectedProjectAvatar(item.avatar || '');
    };

    // 返回时恢复列表状态
    const handleProjectBack = () => {
        setSelectedProject(null);
        setSelectedProjectAvatar('');
    };

    // 加载状态
    if (loading) {
        return (
            <div className={styles.leaderboard} ref={contentRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className={styles.leaderboard} ref={contentRef}>
            {selectedProject ? (
                <ProjectDetail
                    projectName={selectedProject}
                    projectAvatar={selectedProjectAvatar}
                    timeRangeType={timeRangeType}
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    onBack={handleProjectBack}
                />
            ) : (
                <>
                    <div className={styles.leaderboardFilters}>
                        {/* 时间范围类型 Tab 按钮 */}
                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Time Granularity</label>
                            <div className={styles.tabButtons}>
                                <button
                                    className={clsx(styles.tabButton, timeRangeType === "month" && styles.tabButtonActive)}
                                    onClick={() => handleTimeRangeTypeChange("month")}
                                >
                                    Monthly
                                </button>
                                <button
                                    className={clsx(styles.tabButton, timeRangeType === "year" && styles.tabButtonActive)}
                                    onClick={() => handleTimeRangeTypeChange("year")}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>

                        {/* 日期选择框 */}
                        <div className={styles.filterGroup} style={{ width: '180px' }}>
                            <label className={styles.filterLabel}>Select Time</label>
                        <DatePicker
                                    value={timeRangeType === "month"
                                        ? dayjs(`${selectedYear}-${selectedMonth}`, "YYYY-MM")
                                        : dayjs(selectedYear, "YYYY")
                                    }
                                    format={timeRangeType === "month" ? "YYYY/MM" : "YYYY"}
                                    picker={timeRangeType}
                                    onChange={handleDateChange}
                                    style={{ width: '100%', height: '42px' }}
                                    popupClassName="custom-date-picker-popup"
                                    disabledDate={(current) => {
                                        return maxSelectableDate ? current && current > maxSelectableDate : false;
                                    }}
                                />
                        </div>

                        {/* 搜索框 */}
                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Search</label>
                            <input
                                type="text"
                                className={styles.filterInput}
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.leaderboardTable}>
                        {/* 表头 */}
                        <div className={styles.leaderboardHeader}>
                            <div className={clsx(styles.headerCell, styles.rankHeader)} onClick={() => handleSort("rank")}>
                                Rank <SortIcon column="rank" />
                            </div>
                            <div className={styles.headerCellProject} onClick={() => handleSort("name")}>
                                Project <SortIcon column="name" />
                            </div>
                            <div className={styles.headerCellRank} onClick={() => handleSort("openrank")}>
                                OpenRank <SortIcon column="openrank" />
                            </div>
                            <div className={styles.headerCellParticipants} onClick={() => handleSort("participants")}>
                                Participants <SortIcon column="participants" />
                            </div>
                        </div>


                        {/* 数据行 */}
                        <div className={styles.leaderboardTbody}>
                            {paginatedData.length === 0 ? (
                                <div className={styles.noData}>
                                    <span>No Data</span>
                                </div>
                            ) : (
                                paginatedData.map((item) => (
                                    <div key={item.rank} className={styles.leaderboardRow}>
                                        <div className={styles.rankCellWrapper}>
                                            <div className={styles.rankCellContent}>
                                                <div className={clsx(styles.rankCell, {
                                                    [styles.rank1]: item.rank === 1,
                                                    [styles.rank2]: item.rank === 2,
                                                    [styles.rank3]: item.rank === 3,
                                                })}>
                                                    {RANK_BADGES[item.rank] || `${item.rank}`}
                                                </div>
                                                {item.rankDelta !== 0 && (
                                                    <span className={clsx(styles.rankChange, item.rankDelta >= 0 ? styles.rankUp : styles.rankDown)}>
                          {item.rankDelta >= 0 ? "↑" : "↓"} {Math.abs(item.rankDelta)}
                        </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.projectCellWrapper}>
                                            <div className={styles.projectInfo}>
                                                <ProjectLogo name={item.name} avatar={item.avatar} className={styles.projectLogo}/>
                                                <div className={styles.projectDetails}>
                        <span
                            className={styles.projectNameLink}
                            onClick={() => handleProjectClick(item)}
                        >
                          {item.name_zh || item.name}
                        </span>
                                                    <span className={styles.projectDesc}>{item.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.openrankCell}>
                                            <span className={styles.openrankValue}>{item.openrank?.toFixed(2) || '0.00'}</span>
                                            <span className={clsx(styles.rankChange, item.openrankDelta >= 0 ? styles.rankUp : styles.rankDown)}>
                      {item.openrankDelta >= 0 ? "↑" : "↓"} {Math.abs(item.openrankDelta).toFixed(2)}
                    </span>
                                        </div>
                                        <div className={styles.participantsCell}>
                                            <div className={styles.participantsValue}>{item.participants?.toLocaleString() || 0}</div>
                                            <span className={clsx(styles.rankChange, item.participantsDelta >= 0 ? styles.rankUp : styles.rankDown)}>
                      {item.participantsDelta >= 0 ? "↑" : "↓"} {Math.abs(item.participantsDelta).toLocaleString()}
                    </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                className={styles.pageArrow}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                ◀
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={clsx(styles.pageNum, currentPage === page && styles.pageNumActive)}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                className={styles.pageArrow}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                ▶
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
