export type AudioCategory = 'womb' | 'nature' | 'melody'

export type AudioTrack = {
  id: string
  title: string
  category: AudioCategory
  url: string
  duration: number
  icon: string
}

export const categoryTitles: Record<AudioCategory, string> = {
  womb: '01_哭闹安抚_白噪音和机器声',
  nature: '02_自然放松_雨水海浪森林声',
  melody: '03_陪伴入睡_心跳呼吸和摇篮曲',
}

export const tracks: AudioTrack[] = [
  { id: 'audio-001', title: '嘘嘘加钢琴', category: 'melody', duration: 169, icon: 'hearing', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6adf74605001834805292615286/9wtAzIP0ZUwA.mp3' },
  { id: 'audio-002', title: '竖琴音乐', category: 'melody', duration: 300, icon: 'music_note', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/02fe91865001834805294587444/ag6APA5AbmMA.mp3' },
  { id: 'audio-003', title: '风铃声', category: 'melody', duration: 300, icon: 'notifications', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6658369b5001834805292433148/7dA2oABYYh8A.mp3' },
  { id: 'audio-004', title: '颂钵冥想', category: 'melody', duration: 300, icon: 'self_improvement', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b146e3655001834805293375854/8A4iMGwbuXwA.mp3' },
  { id: 'audio-005', title: '钢琴摇篮曲', category: 'melody', duration: 300, icon: 'piano', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6d31d5145001834805387341021/MOaLnBcGABgA.mp3' },
  { id: 'audio-006', title: '八音盒摇篮曲', category: 'melody', duration: 300, icon: 'music_note', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/02fe0d465001834805294586616/5w9FMnYsMfYA.mp3' },
  { id: 'audio-007', title: '太空环境音', category: 'melody', duration: 300, icon: 'auto_awesome', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/f9a9ee7c5001834805294187402/xQkZUSEKGuIA.mp3' },
  { id: 'audio-008', title: '时钟滴答声', category: 'melody', duration: 300, icon: 'schedule', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/d80e18de5001834805290934246/b54ncrO0CAcA.mp3' },
  { id: 'audio-009', title: '猫咪呼噜声', category: 'melody', duration: 300, icon: 'pets', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b86b04c35001834805293696306/sdZtkK8KDkQA.mp3' },
  { id: 'audio-010', title: '呼吸声', category: 'melody', duration: 300, icon: 'favorite', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b3c1de2f5001834805293498777/dACLdeNPJDMA.mp3' },
  { id: 'audio-011', title: '心跳声', category: 'melody', duration: 300, icon: 'monitor_heart', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/1b8f9b395001834805291514813/gVgSVlcaHzcA.mp3' },
  { id: 'audio-012', title: '嘘嘘哄睡声', category: 'melody', duration: 300, icon: 'hearing', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/24f7f3e95001834805291927695/dCaEeAeL0kAA.mp3' },
  { id: 'audio-013', title: '子宫声音', category: 'melody', duration: 300, icon: 'pregnant_woman', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/04f9d8ec5001834805294638759/FJHifa4lIKcA.mp3' },
  { id: 'audio-014', title: '子宫声音心跳', category: 'melody', duration: 180, icon: 'pregnant_woman', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/14c5e2fb5001834805291243933/Sd2dzKCX068A.mp3' },
  { id: 'audio-015', title: '溪流加鸟鸣', category: 'nature', duration: 300, icon: 'water_drop', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/baad887c5001834805293785300/pjbk46xmdlMA.mp3' },
  { id: 'audio-016', title: '雨声加雷声', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6f8707365001834805292810243/lAcc23NElBIA.mp3' },
  { id: 'audio-017', title: '城市雨声', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b58367185001834805293513073/9eOgmvi15ewA.mp3' },
  { id: 'audio-018', title: '海滩浪声', category: 'nature', duration: 300, icon: 'waves', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/baaac3265001834805293780189/bZ0u2GDay6cA.mp3' },
  { id: 'audio-019', title: '冒泡溪流', category: 'nature', duration: 300, icon: 'water_drop', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/228d63755001834805291811530/AhCkfiWTYZQA.mp3' },
  { id: 'audio-020', title: '水下声音', category: 'nature', duration: 300, icon: 'water_drop', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/bc9493875001834805293822985/auF6kdoojT0A.mp3' },
  { id: 'audio-021', title: '篝火噼啪声', category: 'nature', duration: 300, icon: 'local_fire_department', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/204beb755001834805291724212/a7NoIbErzTsA.mp3' },
  { id: 'audio-022', title: '雨林声音', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/9e533f505001834805289840899/u46vxAOc15gA.mp3' },
  { id: 'audio-023', title: '鸟鸣声', category: 'nature', duration: 300, icon: 'flutter_dash', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/664971665001834805292429388/awk6VGxMuaYA.mp3' },
  { id: 'audio-024', title: '夜晚森林', category: 'nature', duration: 300, icon: 'forest', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/c32382e05001834805290047883/Ilahufs7AkEA.mp3' },
  { id: 'audio-025', title: '风吹树叶声', category: 'nature', duration: 300, icon: 'air', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6656b4035001834805292430987/62n4VpJMQwMA.mp3' },
  { id: 'audio-026', title: '风声', category: 'nature', duration: 300, icon: 'air', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/04f8a6a05001834805294636155/TirPbtI1dnYA.mp3' },
  { id: 'audio-027', title: '瀑布声', category: 'nature', duration: 300, icon: 'water_drop', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b86ba6895001834805293697815/vOfCRGpVLAkA.mp3' },
  { id: 'audio-028', title: '溪流水声', category: 'nature', duration: 300, icon: 'water_drop', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/204ad7dd5001834805291722384/pUQCYeTKvykA.mp3' },
  { id: 'audio-029', title: '海浪声', category: 'nature', duration: 300, icon: 'waves', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/4fe2cdf65001834805295570030/inlGUAOlC4MA.mp3' },
  { id: 'audio-030', title: '雷雨声', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6acfaa645001834805292609926/jMJeSbt05ccA.mp3' },
  { id: 'audio-031', title: '屋顶雨声', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6f79627e5001834805292808622/7HKnvY5uAPEA.mp3' },
  { id: 'audio-032', title: '小雨声', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/ba1b17115001834805293702120/alCpoy2egS8A.mp3' },
  { id: 'audio-033', title: '大雨声', category: 'nature', duration: 300, icon: 'rainy', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/48e73fc45001834805295277517/MmFhzgwe31YA.mp3' },
  { id: 'audio-034', title: '雨声加风扇', category: 'womb', duration: 300, icon: 'mode_fan', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/fba41d415001834805294236727/N7pbMzDCJSUA.mp3' },
  { id: 'audio-035', title: '烘干机声音', category: 'womb', duration: 300, icon: 'local_laundry_service', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6acf1ec55001834805292608982/mWZCOoszA64A.mp3' },
  { id: 'audio-036', title: '洗衣机声音', category: 'womb', duration: 300, icon: 'local_laundry_service', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/051aadfd5001834805294652307/AHzYXOaxJc8A.mp3' },
  { id: 'audio-037', title: '白噪音扫频', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/d80d0c7c5001834805290932516/cUTepMIHHSsA.mp3' },
  { id: 'audio-038', title: '深沉棕色噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6656aeb55001834805292430802/DcDrDHuNFeMA.mp3' },
  { id: 'audio-039', title: '灰噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b0fc3f3a5001834805293331482/bIZQ6HSrglcA.mp3' },
  { id: 'audio-040', title: '紫噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/2726a7405001834805386634218/0sRfhiLeN58A.mp3' },
  { id: 'audio-041', title: '蓝噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/254e859d5001834805291970208/zFQ99iht6NgA.mp3' },
  { id: 'audio-042', title: '电视雪花声', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6d2313595001834805387337300/anYpXIIObHAA.mp3' },
  { id: 'audio-043', title: '飞机机舱声', category: 'womb', duration: 300, icon: 'flight', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/9e44dee95001834805289837139/PRGUVnARG1sA.mp3' },
  { id: 'audio-044', title: '汽车行驶声', category: 'womb', duration: 300, icon: 'directions_car', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/228e66975001834805291813008/E5Bfgm4NTM0A.mp3' },
  { id: 'audio-045', title: '火车行驶声', category: 'womb', duration: 300, icon: 'train', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/203c88bd5001834805291719045/8aiASQWAbpIA.mp3' },
  { id: 'audio-046', title: '空调声音', category: 'womb', duration: 300, icon: 'air', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/228df45f5001834805291812656/aRNeNsqh1cgA.mp3' },
  { id: 'audio-047', title: '风扇声音', category: 'womb', duration: 300, icon: 'mode_fan', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/14b5ef5e5001834805291237645/L0RAxNAiGQsA.mp3' },
  { id: 'audio-048', title: '吹风机声音', category: 'womb', duration: 300, icon: 'air', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6b0563655001834805292638835/lA9xaOWKAG0A.mp3' },
  { id: 'audio-049', title: '吸尘器声音', category: 'womb', duration: 300, icon: 'cleaning_services', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/001930fd5001834805294408425/BfU0htPeuS0A.mp3' },
  { id: 'audio-050', title: '棕色噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/6647d8205001834805292426619/CWG6aX1OP10A.mp3' },
  { id: 'audio-051', title: '粉红噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/b582df1a5001834805293512184/4v2ER8M7qL4A.mp3' },
  { id: 'audio-052', title: '纯白噪音', category: 'womb', duration: 300, icon: 'graphic_eq', url: 'https://1385636285.vod-qcloud.com/74c8f6b1vodcq1385636285/eaa1047d5145403727196721116/W4hIjMeOM1IA.mp3' },
]

const sootheOrder: Record<AudioCategory, string[]> = {
  womb: [
    'audio-052',
    'audio-051',
    'audio-034',
    'audio-047',
    'audio-046',
    'audio-036',
    'audio-035',
    'audio-049',
    'audio-048',
    'audio-050',
    'audio-038',
    'audio-039',
    'audio-041',
    'audio-040',
    'audio-037',
    'audio-042',
    'audio-045',
    'audio-044',
    'audio-043',
  ],
  nature: [
    'audio-032',
    'audio-033',
    'audio-031',
    'audio-030',
    'audio-016',
    'audio-017',
    'audio-028',
    'audio-015',
    'audio-019',
    'audio-029',
    'audio-018',
    'audio-024',
    'audio-022',
    'audio-025',
    'audio-026',
    'audio-027',
    'audio-020',
    'audio-023',
    'audio-021',
  ],
  melody: [
    'audio-014',
    'audio-013',
    'audio-011',
    'audio-010',
    'audio-012',
    'audio-001',
    'audio-006',
    'audio-005',
    'audio-002',
    'audio-003',
    'audio-009',
    'audio-008',
    'audio-004',
    'audio-007',
  ],
}

function getSootheRank(category: AudioCategory, id: string): number {
  const index = sootheOrder[category].indexOf(id)
  return index >= 0 ? index : Number.MAX_SAFE_INTEGER
}

export function getTracksByCategory(category: AudioCategory): AudioTrack[] {
  return tracks
    .filter((track) => track.category === category)
    .sort((left, right) => getSootheRank(category, left.id) - getSootheRank(category, right.id))
}

export function getTrackById(id: string): AudioTrack | undefined {
  return tracks.find((track) => track.id === id)
}
