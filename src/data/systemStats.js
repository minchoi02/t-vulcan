// Mock server resource + business KPI data for the 통계관리 (statistics) tab.

export const resourceSummary = [
  { key: 'cpu', label: 'CPU 사용률', value: 47, unit: '%', detail: '8 vCore · 평균 부하 3.2', tone: 'ok' },
  { key: 'ram', label: '메모리(RAM) 사용률', value: 68, unit: '%', detail: '10.9GB / 16GB 사용중', tone: 'warn' },
  { key: 'disk', label: '디스크 사용률', value: 34, unit: '%', detail: '170GB / 500GB 사용중', tone: 'ok' },
  { key: 'db', label: 'DB 커넥션', value: 82, unit: '%', detail: '164 / 200 커넥션 사용중', tone: 'danger' }
]

// 24-hour CPU / RAM trend, sampled hourly
export const resourceTrend = Array.from({ length: 24 }).map((_, h) => {
  const base = 30 + Math.sin(h / 3) * 14
  return {
    hour: `${String(h).padStart(2, '0')}:00`,
    cpu: Math.max(8, Math.round(base + (h > 9 && h < 19 ? 18 : 0) + (h % 5) * 2)),
    ram: Math.max(20, Math.round(base + 28 + (h % 4) * 3))
  }
})

export const processTable = [
  { name: 'php-fpm (intranet)', pid: 1042, cpu: 18.4, ram: 512 },
  { name: 'mysqld', pid: 998, cpu: 22.1, ram: 2048 },
  { name: 'nginx', pid: 771, cpu: 3.2, ram: 96 },
  { name: 'redis-server', pid: 1120, cpu: 1.8, ram: 256 },
  { name: 'batch: 월신품가액 정산', pid: 2210, cpu: 9.6, ram: 320 }
]

export const monthlyVolume = [
  { month: '4월', count: 812, amount: 214500000 },
  { month: '5월', count: 865, amount: 229100000 },
  { month: '6월', count: 790, amount: 205300000 },
  { month: '7월', count: 902, amount: 241800000 },
  { month: '8월', count: 958, amount: 258900000 },
  { month: '9월', count: 367, amount: 101200000 }
]

export const statusBreakdown = [
  { label: '픽업예정', count: 88, tone: 'info' },
  { label: '수리중', count: 61, tone: 'warn' },
  { label: '수리완료', count: 142, tone: 'ok' },
  { label: '배송중', count: 34, tone: 'info' },
  { label: '종결', count: 512, tone: 'muted' }
]
