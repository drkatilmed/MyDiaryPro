/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MyDiary - Personal Memory & Life Archive
 * Full featured bilingual personal journaling, A4 studio, daily reminders, device calendar sync, and cloud backup.
 */

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================

export type Language = 'en' | 'ms';

interface TranslationSet {
  brandTitle: string;
  brandSubtitle: string;
  clockToday: string;
  prayerDetecting: string;
  prayerUpdateHint: string;
  prayerMinsLeft: string;
  archiveBtn: string;
  dailyReminderBtn: string;
  calendarSyncBtn: string;
  languageBtn: string;
  dayQuoteTitle: string;
  calWeekdays: string[];
  calMonthNames: string[];
  hasEntry: string;
  viewAll: string;
  editorTitle: string;
  dateTimeLabel: string;
  currentTimeBtn: string;
  titlePlaceholder: string;
  contentPlaceholder: string;
  moods: { value: string; label: string }[];
  categories: { value: string; label: string }[];
  photoHeader: string;
  galleryBtn: string;
  photoCameraBtn: string;
  voiceNoteHeader: string;
  recordVoiceBtn: string;
  stopRecordBtn: string;
  pauseRecordBtn: string;
  resumeRecordBtn: string;
  discardRecordBtn: string;
  audioFileBtn: string;
  recordingVoiceText: string;
  voiceNoteAttached: string;
  reRecordBtn: string;
  micAccessError: string;
  voiceNoteDeleted: string;
  videoHeader: string;
  videoFileBtn: string;
  videoCameraBtn: string;
  saveEntryBtn: string;
  saveGcalBtn: string;
  archiveTitle: string;
  archiveSubtitle: string;
  tabEntries: string;
  tabTemplates: string;
  searchPlaceholder: string;
  swipeHint: string;
  noEntries: string;
  templatesHeader: string;
  pageSizeHeader: string;
  portrait: string;
  landscape: string;
  periodHeader: string;
  period1: string;
  period7: string;
  period30: string;
  livePreviewBtn: string;
  studioTitle: string;
  textColorTitle: string;
  headingLabel: string;
  bodyLabel: string;
  quoteLabel: string;
  boxOpacityLabel: string;
  saveLayoutBtn: string;
  resetPositionsBtn: string;
  printPdfBtn: string;
  downloadEbookBtn: string;
  pinchTip: string;
  cameraPhotoHeading: string;
  cameraVideoHeading: string;
  recordingText: string;
  flipCameraTitle: string;
  footerCredit: string;
  // Modals for new features
  reminderModalTitle: string;
  reminderTimeLabel: string;
  reminderFreqLabel: string;
  reminderFreqAll: string;
  reminderFreqWeekdays: string;
  reminderFreqWeekends: string;
  reminderSoundLabel: string;
  testNotificationBtn: string;
  enablePermissionBtn: string;
  permissionGranted: string;
  permissionDenied: string;
  saveReminderBtn: string;
  reminderNotificationTitle: string;
  reminderNotificationBody: string;
  calendarSyncTitle: string;
  syncDailyAlarmBtn: string;
  syncDailyAlarmDesc: string;
  syncAllEntriesBtn: string;
  syncAllEntriesDesc: string;
  syncCurrentEntryBtn: string;
  zoomFit: string;
  zoomIn: string;
  zoomOut: string;
  zoom100: string;
  moveBoxTitle: string;
  boxHeader: string;
  boxEntries: string;
  boxQuote: string;
  bodyAndMetaLabel: string;
  themeBtn: string;
  themeModalTitle: string;
  themeSubtitle: string;
}

const TRANSLATIONS: Record<Language, TranslationSet> = {
  en: {
    brandTitle: 'MyDiary',
    brandSubtitle: 'Personal Memory & Life Archive',
    clockToday: 'Today',
    prayerDetecting: 'Detecting location...',
    prayerUpdateHint: 'Click to update prayer location',
    prayerMinsLeft: 'left',
    archiveBtn: 'Archive',
    dailyReminderBtn: 'Reminder',
    calendarSyncBtn: 'Sync Cal',
    languageBtn: 'BM',
    dayQuoteTitle: 'Daily Motivation',
    calWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    calMonthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    hasEntry: 'Has Entry',
    viewAll: 'View All',
    editorTitle: 'New Reflection & Plans',
    dateTimeLabel: 'Entry Date & Time:',
    currentTimeBtn: 'Current Time',
    titlePlaceholder: 'Reflection or plan title...',
    contentPlaceholder: 'Write your experiences, feelings, or future plans here...',
    moods: [
      { value: '🌸 Peaceful & Happy', label: '🌸 Peaceful & Happy' },
      { value: '✨ Enthusiastic', label: '✨ Enthusiastic' },
      { value: '🤲 Grateful', label: '🤲 Grateful' },
      { value: '⚡ Productive', label: '⚡ Productive' },
      { value: '🫈 Whatever / Chill', label: '🫈 Whatever / Chill' },
    ],
    categories: [
      { value: 'Daily Journal', label: 'Daily Journal' },
      { value: 'Plans & Goals', label: 'Plans & Goals' },
      { value: 'Sweet Memories', label: 'Sweet Memories' },
      { value: 'Ideas & Creativity', label: 'Ideas & Creativity' },
      { value: 'Tasks / Work', label: 'Tasks / Work' },
    ],
    photoHeader: 'Photo Attachments',
    galleryBtn: 'Gallery',
    photoCameraBtn: 'Photo Cam (1:1)',
    voiceNoteHeader: 'Voice Note',
    recordVoiceBtn: 'Record Voice',
    stopRecordBtn: 'Stop & Save',
    pauseRecordBtn: 'Pause',
    resumeRecordBtn: 'Resume',
    discardRecordBtn: 'Discard',
    audioFileBtn: 'Audio File',
    recordingVoiceText: 'Recording voice note...',
    voiceNoteAttached: 'Voice note ready to save!',
    reRecordBtn: 'Re-record',
    micAccessError: 'Microphone permission denied or not supported.',
    voiceNoteDeleted: 'Voice note removed.',
    videoHeader: 'Video Attachment',
    videoFileBtn: 'Video File',
    videoCameraBtn: 'Video Cam (1:1)',
    saveEntryBtn: 'Save Entry',
    saveGcalBtn: 'Save & Schedule in Google Calendar',
    archiveTitle: 'Joyful Memories • Happy Go Lucky!',
    archiveSubtitle: 'Personal Archive',
    tabEntries: 'Entries',
    tabTemplates: 'PDF Templates (10)',
    searchPlaceholder: 'Search titles or content...',
    swipeHint: 'Swipe left/right to close',
    noEntries: 'No entries found.',
    templatesHeader: '10 Canvas Painting Templates (Google Drive):',
    pageSizeHeader: 'Select A4 Document Size:',
    portrait: '📱 Portrait (210×297mm)',
    landscape: '💻 Landscape (297×210mm)',
    periodHeader: 'E-Book / PDF Entries Period:',
    period1: '1 Day',
    period7: '7 Days',
    period30: '1 Month',
    livePreviewBtn: 'Live Preview',
    studioTitle: 'A4 Design Studio',
    textColorTitle: 'Text Colors (24):',
    headingLabel: 'Title:',
    bodyLabel: 'Body:',
    quoteLabel: 'Quote:',
    boxOpacityLabel: 'Card Box:',
    saveLayoutBtn: 'Save Layout',
    resetPositionsBtn: 'Reset Pos',
    printPdfBtn: 'Print / Generate PDF',
    downloadEbookBtn: 'Generate E-Book (.html)',
    pinchTip: 'Tip: Drag blocks to move. Use two fingers (pinch) to resize text size.',
    cameraPhotoHeading: 'Photo Camera (1:1)',
    cameraVideoHeading: 'Video Camera (1:1) • 1 Slot Max',
    recordingText: 'Recording',
    flipCameraTitle: 'Switch Camera',
    footerCredit: '© 2026 MyDiary. Powered by Red Power Rangers.',
    // New Feature Modals
    reminderModalTitle: 'Daily Productivity Reminder',
    reminderTimeLabel: 'Scheduled Reminder Time:',
    reminderFreqLabel: 'Frequency:',
    reminderFreqAll: 'Everyday',
    reminderFreqWeekdays: 'Weekdays (Mon-Fri)',
    reminderFreqWeekends: 'Weekends (Sat-Sun)',
    reminderSoundLabel: 'Play Gentle Audio Chime',
    testNotificationBtn: 'Test Notification Now',
    enablePermissionBtn: 'Enable Browser Notifications',
    permissionGranted: 'Notifications Allowed',
    permissionDenied: 'Notifications Blocked in Browser',
    saveReminderBtn: 'Save Reminder Preferences',
    reminderNotificationTitle: '🌸 Time for MyDiary Reflection!',
    reminderNotificationBody: 'Take a gentle pause to write your thoughts, memories, and productivity goals today.',
    calendarSyncTitle: 'Device Calendar Synchronization',
    syncDailyAlarmBtn: 'Add Daily Journaling Alarm (.ics)',
    syncDailyAlarmDesc: 'Syncs a recurring daily alarm with Apple Calendar, Google Cal, or Outlook on your device.',
    syncAllEntriesBtn: 'Sync All Entries to Calendar (.ics)',
    syncAllEntriesDesc: 'Exports all diary notes as calendar events with titles, mood tags, and dates.',
    syncCurrentEntryBtn: 'Sync Current Entry to Device Calendar (.ics)',
    zoomFit: '📱 Fit Screen',
    zoomIn: '🔍 Zoom +',
    zoomOut: '🔍 Zoom -',
    zoom100: '100% Size',
    moveBoxTitle: 'Move Box:',
    boxHeader: 'Header & Date',
    boxEntries: 'Note & Mood',
    boxQuote: 'Quote',
    bodyAndMetaLabel: 'Body & Time/Mood:',
    themeBtn: 'Themes (5)',
    themeModalTitle: '5 App Theme Colors',
    themeSubtitle: 'Personalize your diary atmosphere with 5 handcrafted palettes.',
  },
  ms: {
    brandTitle: 'MyDiary',
    brandSubtitle: 'Personal Memory & Life Archive',
    clockToday: 'Hari Ini',
    prayerDetecting: 'Mengesan lokasi...',
    prayerUpdateHint: 'Klik untuk kemaskini lokasi solat',
    prayerMinsLeft: 'lagi',
    archiveBtn: 'Arkib',
    dailyReminderBtn: 'Peringatan',
    calendarSyncBtn: 'Kalendar',
    languageBtn: 'EN',
    dayQuoteTitle: 'Motivasi Harian',
    calWeekdays: ['Ah', 'Is', 'Se', 'Ra', 'Kh', 'Ju', 'Sa'],
    calMonthNames: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
    hasEntry: 'Ada Catatan',
    viewAll: 'Lihat Semua',
    editorTitle: 'Coretan & Rancangan Baharu',
    dateTimeLabel: 'Tarikh & Masa Catatan:',
    currentTimeBtn: 'Waktu Sekarang',
    titlePlaceholder: 'Tajuk catatan atau perancangan...',
    contentPlaceholder: 'Tuliskan pengalaman, perasaan, atau rancangan masa hadapan anda di sini...',
    moods: [
      { value: '🌸 Tenang & Bahagia', label: '🌸 Tenang & Bahagia' },
      { value: '✨ Bersemangat', label: '✨ Bersemangat' },
      { value: '🤲 Bersyukur', label: '🤲 Bersyukur' },
      { value: '⚡ Produktif', label: '⚡ Produktif' },
      { value: '🫈 Lantak p la', label: '🫈 Lantak p la' },
    ],
    categories: [
      { value: 'Catatan Harian', label: 'Catatan Harian' },
      { value: 'Perancangan & Matlamat', label: 'Perancangan & Matlamat' },
      { value: 'Kenangan Indah', label: 'Kenangan Indah' },
      { value: 'Idea & Kreativiti', label: 'Idea & Kreativiti' },
      { value: 'Tugasan / Kerja', label: 'Tugasan / Kerja' },
    ],
    photoHeader: 'Lampiran Gambar',
    galleryBtn: 'Galeri',
    photoCameraBtn: 'Kamera Gambar (1:1)',
    voiceNoteHeader: 'Nota Suara',
    recordVoiceBtn: 'Rakam Suara',
    stopRecordBtn: 'Berhenti & Simpan',
    pauseRecordBtn: 'Jeda',
    resumeRecordBtn: 'Sambung',
    discardRecordBtn: 'Batal',
    audioFileBtn: 'Fail Audio',
    recordingVoiceText: 'Sedang merakam suara...',
    voiceNoteAttached: 'Nota suara sedia disimpan!',
    reRecordBtn: 'Rakam Semula',
    micAccessError: 'Kebenaran mikrofon disekat atau tidak disokong.',
    voiceNoteDeleted: 'Nota suara dipadam.',
    videoHeader: 'Lampiran Video',
    videoFileBtn: 'Fail Video',
    videoCameraBtn: 'Kamera Video (1:1)',
    saveEntryBtn: 'Simpan Catatan',
    saveGcalBtn: 'Simpan & Jadual di Google Calendar',
    archiveTitle: 'Joyful Memories • Happy Go Lucky!',
    archiveSubtitle: 'Arkib Peribadi',
    tabEntries: 'Catatan',
    tabTemplates: 'Templat PDF (10)',
    searchPlaceholder: 'Cari tajuk atau isi catatan...',
    swipeHint: 'Swipe kiri/kanan untuk tutup',
    noEntries: 'Tiada catatan ditemui.',
    templatesHeader: '10 Templat Latar Lukisan (Google Drive):',
    pageSizeHeader: 'Pilih Saiz Dokumen A4:',
    portrait: '📱 Potret (210×297mm)',
    landscape: '💻 Landskap (297×210mm)',
    periodHeader: 'Tempoh Catatan E-Book / PDF:',
    period1: '1 Hari',
    period7: '7 Hari',
    period30: '1 Bulan',
    livePreviewBtn: 'Live Preview',
    studioTitle: 'Studio Rekaan A4',
    textColorTitle: 'Warna Tulisan (24):',
    headingLabel: 'Tajuk:',
    bodyLabel: 'Catatan:',
    quoteLabel: 'Motivasi:',
    boxOpacityLabel: 'Kotak:',
    saveLayoutBtn: 'Simpan',
    resetPositionsBtn: 'Reset Posisi',
    printPdfBtn: 'Cetak / Jana PDF',
    downloadEbookBtn: 'Jana E-Book (.html)',
    pinchTip: 'Tip: Sentuh & seret untuk alih blok atau guna butang anak panah di atas. Guna 2 jari (pinch) untuk besarkan/kecilkan teks.',
    cameraPhotoHeading: 'Studio Kamera Gambar (1:1)',
    cameraVideoHeading: 'Kamera Video (1:1) • Had 1 Slot',
    recordingText: 'Merakam',
    flipCameraTitle: 'Tukar Kamera',
    footerCredit: '© 2026 MyDiary. Dikuasakan oleh Power Rangers Merah.',
    // New Feature Modals
    reminderModalTitle: 'Notifikasi Peringatan Harian',
    reminderTimeLabel: 'Waktu Peringatan Pilihan Anda:',
    reminderFreqLabel: 'Kekerapan:',
    reminderFreqAll: 'Setiap Hari',
    reminderFreqWeekdays: 'Hari Bekerja (Isn-Jum)',
    reminderFreqWeekends: 'Hujung Minggu (Sab-Ahd)',
    reminderSoundLabel: 'Mainkan Nada Bunyi Lembut',
    testNotificationBtn: 'Uji Notifikasi Sekarang',
    enablePermissionBtn: 'Benarkan Notifikasi Pelayar',
    permissionGranted: 'Notifikasi Dibenarkan',
    permissionDenied: 'Notifikasi Disekat oleh Pelayar',
    saveReminderBtn: 'Simpan Pilihan Peringatan',
    reminderNotificationTitle: '🌸 Waktunya untuk MyDiary!',
    reminderNotificationBody: 'Luangkan masa sebentar untuk mencatat detik indah, pengalaman, dan rancangan hari ini.',
    calendarSyncTitle: 'Sinkronisasi Kalendar Peranti',
    syncDailyAlarmBtn: 'Tambah Penggera Harian ke Kalendar (.ics)',
    syncDailyAlarmDesc: 'Sinkronkan peringatan berulang ke Apple Calendar, Google Cal, atau Outlook peranti anda.',
    syncAllEntriesBtn: 'Eksport Semua Catatan ke Kalendar (.ics)',
    syncAllEntriesDesc: 'Muat turun fail kalendar yang mengandungi semua entri diari anda bersama mood dan tarikh.',
    syncCurrentEntryBtn: 'Sinkron Catatan Semasa ke Kalendar (.ics)',
    zoomFit: '📱 Muat Skrin Telefon',
    zoomIn: '🔍 Zoom +',
    zoomOut: '🔍 Zoom -',
    zoom100: 'Saiz 100%',
    moveBoxTitle: 'Alih Posisi Kotak:',
    boxHeader: 'Tajuk & Tarikh',
    boxEntries: 'Kotak Catatan & Mood',
    boxQuote: 'Motivasi',
    bodyAndMetaLabel: 'Catatan & Masa/Mood:',
    themeBtn: 'Tema (5)',
    themeModalTitle: '5 Pilihan Tema Warna',
    themeSubtitle: 'Peribadikan suasana diari anda dengan 5 palet warna eksklusif.',
  },
};

export type AppTheme = 'sakura' | 'amber' | 'emerald' | 'navy' | 'midnight';

export interface ThemeConfig {
  id: AppTheme;
  nameEn: string;
  nameMs: string;
  icon: string;
  previewColor: string;
  accentColor: string;
  bgCanvas: string;
  isDark: boolean;
  descEn: string;
  descMs: string;
  swatches: string[];
}

export const APP_THEMES: ThemeConfig[] = [
  {
    id: 'sakura',
    nameEn: 'Sakura Rose',
    nameMs: 'Mawar Sakura',
    icon: '🌸',
    previewColor: '#fd6c9e',
    accentColor: '#fd6c9e',
    bgCanvas: '#fff5f8',
    isDark: false,
    descEn: 'Gentle romantic pink with clean serene white',
    descMs: 'Merah jambu sakura lembut dan latar tenang',
    swatches: ['#fff5f8', '#ffffff', '#ffd1df', '#fd6c9e'],
  },
  {
    id: 'amber',
    nameEn: 'Warm Amber',
    nameMs: 'Madu Karamel',
    icon: '🍯',
    previewColor: '#d97706',
    accentColor: '#d97706',
    bgCanvas: '#faf6f0',
    isDark: false,
    descEn: 'Warm cozy honey, sunset glow & terracotta',
    descMs: 'Sentuhan madu suam, sinar senja & terracotta',
    swatches: ['#faf6f0', '#ffffff', '#fed7aa', '#d97706'],
  },
  {
    id: 'emerald',
    nameEn: 'Emerald Forest',
    nameMs: 'Hutan Zamrud',
    icon: '🌿',
    previewColor: '#059669',
    accentColor: '#059669',
    bgCanvas: '#f0fdf4',
    isDark: false,
    descEn: 'Botanical sage & fresh calming mint',
    descMs: 'Hijau botani segar & pudina menenangkan',
    swatches: ['#f0fdf4', '#ffffff', '#bbf7d0', '#059669'],
  },
  {
    id: 'navy',
    nameEn: 'Ocean Sapphire',
    nameMs: 'Nilam Samudera',
    icon: '🌌',
    previewColor: '#38bdf8',
    accentColor: '#38bdf8',
    bgCanvas: '#0b1329',
    isDark: true,
    descEn: 'High-contrast midnight indigo with vivid sapphire',
    descMs: 'Biru nilam pekat dan malam berbintang moden',
    swatches: ['#0b1329', '#111d42', '#243b7d', '#38bdf8'],
  },
  {
    id: 'midnight',
    nameEn: 'Midnight Obsidian',
    nameMs: 'Obsidian Emas',
    icon: '✨',
    previewColor: '#eab308',
    accentColor: '#eab308',
    bgCanvas: '#0c0a09',
    isDark: true,
    descEn: 'Luxury velvet charcoal black with radiant gold',
    descMs: 'Arang baldu mewah dengan kilauan emas klasik',
    swatches: ['#0c0a09', '#1c1917', '#44403c', '#eab308'],
  },
];

const DAILY_QUOTES_EN = [
  "A new day brings fresh strength and new thoughts.",
  "Write your dreams with the ink of courage.",
  "Small steps today are the beginning of great success tomorrow.",
  "Peace of mind is life's true luxury.",
  "Cherish every little moment that fills your day.",
  "Become a better version of yourself than you were yesterday.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Every challenge is a teacher shaping resilience and wisdom.",
  "Gratitude turns what we have into enough.",
  "Focus on the process, enjoy the journey.",
  "Don't wait for the perfect moment; make this moment meaningful.",
  "Success begins with the courage to try.",
  "Smile; your day is worthy of being filled with kindness.",
  "Discipline is the bridge between goals and accomplishment.",
  "Genuine kindness always finds its way back.",
  "A journey of a thousand miles begins with a single step.",
  "Rest a while if you are weary, but never give up.",
  "Every sunrise promises a fresh horizon of hope.",
  "Your words shape your reality; journal the finest ones.",
  "True inner strength rises from a quiet and grateful mind.",
  "Live in the present with thoughtful planning for tomorrow.",
  "Failure is simply an opportunity to begin again more intelligently.",
  "Sincerity in life creates timeless memories.",
  "Give yourself space to blossom at your own pace.",
  "There is always something beautiful to be thankful for today.",
  "Create opportunities where others only see obstacles.",
  "Value the loved ones around you; memories with them are priceless.",
  "Perseverance today is the crown of victory tomorrow.",
  "Let every page of this diary witness your life's courage.",
  "Believe in the extraordinary potential residing within you.",
  "Close this month with gratitude and welcome the future with hope."
];

const DAILY_QUOTES_MS = [
  "Hari baharu membawa kekuatan dan pemikiran baharu.",
  "Tuliskan impianmu dengan dakwat keberanian.",
  "Langkah kecil hari ini adalah permulaan kejayaan besar esok.",
  "Ketenangan minda adalah kemewahan hidup yang sebenar.",
  "Hargai setiap detik kecil yang mengisi harimu.",
  "Jadilah versi dirimu yang lebih baik daripada semalam.",
  "Masa depan dimiliki oleh mereka yang percaya pada keindahan impian mereka.",
  "Setiap cabaran adalah guru yang membentuk kematangan.",
  "Kesyukuran mengubah apa yang kita ada menjadi mencukupi.",
  "Fokus pada proses, nikmati perjalanannya.",
  "Jangan tunggu saat yang sempurna, jadikan saat ini bermakna.",
  "Kejayaan bermula dengan keberanian untuk mencuba.",
  "Tersenyumlah, harimu berharga untuk diisi dengan kebaikan.",
  "Disiplin adalah jambatan antara matlamat dan pencapaian.",
  "Kebaikan yang ikhlas sentiasa menemui jalan kembali.",
  "Perjalanan seribu batu bermula dengan langkah pertama.",
  "Rehatlah sebentar jika lelah, tetapi jangan pernah berputus asa.",
  "Setiap matahari terbit menjanjikan harapan yang segar.",
  "Kata-katamu membentuk realitimu; catatkan yang terbaik.",
  "Kekuatan sebenar terbit daripada ketenangan jiwa.",
  "Hiduplah pada masa kini dengan perancangan masa depan yang bijak.",
  "Kegagalan hanyalah peluang untuk bermula semula dengan lebih bijak.",
  "Keikhlasan dalam berkarya menghasilkan keabadian kenangan.",
  "Beri ruang untuk dirimu berkembang mengikut waktumu sendiri.",
  "Sentiasa ada sesuatu yang indah untuk disyukuri hari ini.",
  "Cipta peluang di mana orang lain hanya melihat halangan.",
  "Hargai orang di sekelilingmu, kenangan bersama mereka tidak ternilai.",
  "Ketabahan hari ini adalah mahkota kemenangan esok.",
  "Jadikan setiap helai jurnal ini saksi perjuangan hidupmu.",
  "Percayalah pada potensi luar biasa yang ada dalam dirimu.",
  "Tutup bulan ini dengan kesyukuran dan sambut masa depan dengan harapan."
];

const PALETTE_COLORS = [
  { name: 'Copper Brown', hex: '#6b2c12' },
  { name: 'Ancient Amber', hex: '#92400e' },
  { name: 'Vintage Gold', hex: '#b45309' },
  { name: 'Espresso Black', hex: '#1c1917' },
  { name: 'Olive Green', hex: '#166534' },
  { name: 'Forest Green', hex: '#064e3b' },
  { name: 'Jade Green', hex: '#0f766e' },
  { name: 'Midnight Blue', hex: '#1e3a8a' },
  { name: 'Royal Blue', hex: '#1d4ed8' },
  { name: 'Teal Blue', hex: '#0369a1' },
  { name: 'Dark Lavender', hex: '#4c1d95' },
  { name: 'Plum Purple', hex: '#581c87' },
  { name: 'Maroon Red', hex: '#881337' },
  { name: 'Deep Ruby', hex: '#991b1b' },
  { name: 'Terracotta Rose', hex: '#9f1239' },
  { name: 'Caramel Brown', hex: '#78350f' },
  { name: 'Dark Caramel Gold', hex: '#854d0e' },
  { name: 'Graphite Slate', hex: '#334155' },
  { name: 'Wood Bark Brown', hex: '#451a03' },
  { name: 'Vintage Brick Red', hex: '#7c2d12' },
  { name: 'Rosewood Pink', hex: '#be185d' },
  { name: 'Royal Indigo', hex: '#3730a3' },
  { name: 'Dark Coffee', hex: '#29180f' },
  { name: 'Ivory White', hex: '#f8fafc' },
];

const TEMPLATE_METADATA: Record<string, { bgUrl: string; fontHeading: string; fontBody: string; lineColor: string; name: string }> = {
  template_alps_1: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1KwQYNrjGPeJcLfzjQhi00orgYwFBdAG6',
    fontHeading: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Libre Baskerville', Georgia, serif",
    lineColor: 'rgba(163, 89, 44, 0.65)',
    name: '1. Swiss Alps Mountain',
  },
  template_alps_2: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1wxdDpvxnB4vxo2VjAsCcMIDNaWTg3hyl',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'EB Garamond', Georgia, serif",
    lineColor: 'rgba(124, 45, 18, 0.55)',
    name: '2. Alpine Village Canvas',
  },
  template_alps_3: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1mJo8XgcLdH1dmIOLK2MhMUncIOBNix-0',
    fontHeading: "'Cinzel', serif",
    fontBody: "'Lora', Georgia, serif",
    lineColor: 'rgba(6, 78, 59, 0.55)',
    name: '3. Pine Forest & Mist',
  },
  template_alps_4: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1O3_iTltPvDKBhnO9jyUx2QoAtFUSnb7j',
    fontHeading: "'Marcellus', 'Cinzel Decorative', serif",
    fontBody: "'Spectral', Georgia, serif",
    lineColor: 'rgba(76, 29, 149, 0.55)',
    name: '4. Historic Chateau Lake',
  },
  template_alps_5: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1J2a2ULKkAfQHcATe7idqH5wiDQ40s2N-',
    fontHeading: "'Bodoni Moda', serif",
    fontBody: "'Libre Baskerville', Georgia, serif",
    lineColor: 'rgba(154, 52, 18, 0.55)',
    name: '5. Golden Sunset Range',
  },
  template_alps_6: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1ZstIrYAbLfXI7z0lor6Ol4a1yGmAjJQ-',
    fontHeading: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Libre Baskerville', Georgia, serif",
    lineColor: 'rgba(163, 89, 44, 0.65)',
    name: '6. Classical Heritage',
  },
  template_alps_7: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1ak02IxhwQulxenco9-rdIyfeQ2XN-QOX',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'EB Garamond', Georgia, serif",
    lineColor: 'rgba(180, 83, 9, 0.55)',
    name: '7. Golden Meadow Sunset',
  },
  template_alps_8: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1Q0JxiNlwuUVEg_zL9kvCDYPoxvnEQ6xm',
    fontHeading: "'Cinzel', serif",
    fontBody: "'Lora', Georgia, serif",
    lineColor: 'rgba(15, 118, 110, 0.55)',
    name: '8. Tranquil Highland Lake',
  },
  template_alps_9: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1KJ8drgtJxTJcc31Za0EuEJdadwOppSdd',
    fontHeading: "'Marcellus', serif",
    fontBody: "'Spectral', Georgia, serif",
    lineColor: 'rgba(79, 70, 229, 0.55)',
    name: '9. Royal Garden Estate',
  },
  template_alps_10: {
    bgUrl: 'https://lh3.googleusercontent.com/d/1BatljiEZBZtmqhoXsO-gbSnQan4mvz06',
    fontHeading: "'Bodoni Moda', serif",
    fontBody: "'Libre Baskerville', Georgia, serif",
    lineColor: 'rgba(55, 65, 81, 0.55)',
    name: '10. Enchanted Mist Valley',
  },
};

export interface JournalEntry {
  id: string;
  title: string;
  mood: string;
  category: string;
  content: string;
  timestamp: string;
  photos: string[];
  video?: string | null;
  hasIndexedVideo?: boolean;
  audioVoiceNote?: string | null;
  hasIndexedAudio?: boolean;
  audioDuration?: number;
}

// Format seconds into MM:SS
function formatAudioSeconds(sec: number): string {
  if (isNaN(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// IndexedDB Helper for Large Videos & Audio Voice Notes
let dbInstance: IDBDatabase | null = null;
function getIndexedMediaDB(): Promise<IDBDatabase | null> {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) return resolve(null);
    const req = window.indexedDB.open('MyDiaryMediaDB', 2);
    req.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('audios')) {
        db.createObjectStore('audios', { keyPath: 'id' });
      }
    };
    req.onsuccess = (e: any) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };
    req.onerror = () => resolve(null);
  });
}

async function saveVideoToIndexedDB(id: string, blobOrDataUrl: Blob | string) {
  const db = await getIndexedMediaDB();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction('videos', 'readwrite');
      const store = tx.objectStore('videos');
      store.put({ id, data: blobOrDataUrl });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

async function getVideoFromIndexedDB(id: string): Promise<Blob | string | null> {
  const db = await getIndexedMediaDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction('videos', 'readonly');
      const store = tx.objectStore('videos');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function deleteVideoFromIndexedDB(id: string) {
  const db = await getIndexedMediaDB();
  if (!db) return;
  try {
    const tx = db.transaction('videos', 'readwrite');
    tx.objectStore('videos').delete(id);
  } catch {}
}

async function saveAudioToIndexedDB(id: string, blobOrDataUrl: Blob | string) {
  const db = await getIndexedMediaDB();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction('audios', 'readwrite');
      const store = tx.objectStore('audios');
      store.put({ id, data: blobOrDataUrl });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

async function getAudioFromIndexedDB(id: string): Promise<Blob | string | null> {
  const db = await getIndexedMediaDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction('audios', 'readonly');
      const store = tx.objectStore('audios');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function deleteAudioFromIndexedDB(id: string) {
  const db = await getIndexedMediaDB();
  if (!db) return;
  try {
    const tx = db.transaction('audios', 'readwrite');
    tx.objectStore('audios').delete(id);
  } catch {}
}

function playGentleChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    playTone(523.25, now, 0.6); // C5
    playTone(659.25, now + 0.15, 0.7); // E5
    playTone(783.99, now + 0.3, 0.9); // G5
    playTone(1046.5, now + 0.45, 1.2); // C6
  } catch {}
}

// ==========================================
// 2. MAIN APP COMPONENT
// ==========================================

export default function App() {
  // Language State - DEFAULT ENGLISH
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('mydiary_lang');
    return stored === 'ms' ? 'ms' : 'en';
  });

  const t = TRANSLATIONS[lang];

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  }, []);

  // Clock state
  const [currentTimeStr, setCurrentTimeStr] = useState({ hm: '00:00', sec: ':00', day: 'Today', date: '01 Jan' });

  // Prayer times state
  const [prayerData, setPrayerData] = useState({ name: 'Fajr', time: '--:--', countdown: 'Detecting...' });

  // Entries & Calendar State
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredDate, setFilteredDate] = useState<string | null>(null);
  const [calendarCursor, setCalendarCursor] = useState<Date>(new Date());

  // Form State
  const [formDateTime, setFormDateTime] = useState<string>('');
  const [entryTitle, setEntryTitle] = useState<string>('');
  const [entryMood, setEntryMood] = useState<string>('🌸 Peaceful & Happy');
  const [entryCategory, setEntryCategory] = useState<string>('Daily Journal');
  const [entryContent, setEntryContent] = useState<string>('');
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([]);
  const [photoCursor, setPhotoCursor] = useState<number>(0);
  const [attachedVideoUrl, setAttachedVideoUrl] = useState<string | null>(null);
  const [attachedVideoBlob, setAttachedVideoBlob] = useState<Blob | null>(null);

  // Voice Note State
  const [attachedAudioUrl, setAttachedAudioUrl] = useState<string | null>(null);
  const [attachedAudioBlob, setAttachedAudioBlob] = useState<Blob | null>(null);
  const [attachedAudioDuration, setAttachedAudioDuration] = useState<number>(0);
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(false);
  const [isAudioPaused, setIsAudioPaused] = useState<boolean>(false);
  const [audioRecSeconds, setAudioRecSeconds] = useState<number>(0);
  const [audioVisualizerLevels, setAudioVisualizerLevels] = useState<number[]>([20, 35, 60, 45, 80, 50, 30, 65, 90, 70, 40, 25]);
  const [loadedAudiosMap, setLoadedAudiosMap] = useState<Record<string, string>>({});

  // Archive Drawer State
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [archiveTab, setArchiveTab] = useState<'entries' | 'templates'>('entries');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loadedVideosMap, setLoadedVideosMap] = useState<Record<string, string>>({});

  // Studio & Templates State
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('template_alps_1');
  const [docOrientation, setDocOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [exportPeriod, setExportPeriod] = useState<'1day' | '7days' | '30days'>('7days');
  const [activeTextColor, setActiveTextColor] = useState<string>('#6b2c12');
  const [boxOpacity, setBoxOpacity] = useState<number>(0.65);
  const [fontSizes, setFontSizes] = useState({ heading: 16, body: 9, quote: 16 });
  const [blockPositions, setBlockPositions] = useState({
    header: { x: 0, y: 0 },
    entries: { x: 0, y: 0 },
    quote: { x: 0, y: 0 },
  });
  const [zoomMode, setZoomMode] = useState<'fit' | number>('fit');
  const [fitScale, setFitScale] = useState<number>(0.35);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Camera Modal State
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recTimer, setRecTimer] = useState<number>(0);

  // New Features Modals
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>('09:00');
  const [reminderFrequency, setReminderFrequency] = useState<'all' | 'weekdays' | 'weekends'>('all');
  const [reminderChime, setReminderChime] = useState<boolean>(true);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);

  // 5 Theme Colors State
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem('mydiary_theme');
      if (stored && ['sakura', 'amber', 'emerald', 'navy', 'midnight'].includes(stored)) {
        return stored as AppTheme;
      }
    } catch {}
    return 'sakura';
  });
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Sync theme class to document body
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
    try {
      localStorage.setItem('mydiary_theme', currentTheme);
    } catch {}
  }, [currentTheme]);

  // Back Navigation & Modal State Refs
  const isStudioOpenRef = useRef(isStudioOpen);
  const isArchiveOpenRef = useRef(isArchiveOpen);
  const isThemeModalOpenRef = useRef(isThemeModalOpen);
  const isReminderModalOpenRef = useRef(isReminderModalOpen);
  const isCalendarModalOpenRef = useRef(isCalendarModalOpen);
  const isCameraModalOpenRef = useRef(isCameraModalOpen);
  const filteredDateRef = useRef(filteredDate);
  const langRef = useRef(lang);
  const isAudioRecordingRef = useRef<boolean>(false);
  const lastBackPressRef = useRef<number>(0);

  useEffect(() => { isStudioOpenRef.current = isStudioOpen; }, [isStudioOpen]);
  useEffect(() => { isArchiveOpenRef.current = isArchiveOpen; }, [isArchiveOpen]);
  useEffect(() => { isThemeModalOpenRef.current = isThemeModalOpen; }, [isThemeModalOpen]);
  useEffect(() => { isReminderModalOpenRef.current = isReminderModalOpen; }, [isReminderModalOpen]);
  useEffect(() => { isCalendarModalOpenRef.current = isCalendarModalOpen; }, [isCalendarModalOpen]);
  useEffect(() => { isCameraModalOpenRef.current = isCameraModalOpen; }, [isCameraModalOpen]);
  useEffect(() => { filteredDateRef.current = filteredDate; }, [filteredDate]);
  useEffect(() => { langRef.current = lang; }, [lang]);
  useEffect(() => { isAudioRecordingRef.current = isAudioRecording; }, [isAudioRecording]);

  // Helper to open modal with history push
  const openModal = useCallback((name: string, opener: () => void) => {
    try {
      window.history.pushState({ modal: name }, '');
    } catch {}
    opener();
  }, []);

  // Refs
  const dustCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const archiveDustCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isUpdatingFromDragRef = useRef<boolean>(false);
  const directPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const directVideoInputRef = useRef<HTMLInputElement | null>(null);
  const directAudioInputRef = useRef<HTMLInputElement | null>(null);
  const editorAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioTimerIntervalRef = useRef<any>(null);
  const audioVisualizerAnimRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);

  // Sync language with default mood and category
  const toggleLanguage = () => {
    const nextLang: Language = lang === 'en' ? 'ms' : 'en';
    setLang(nextLang);
    localStorage.setItem('mydiary_lang', nextLang);
    if (nextLang === 'en') {
      setEntryMood('🌸 Peaceful & Happy');
      setEntryCategory('Daily Journal');
    } else {
      setEntryMood('🌸 Tenang & Bahagia');
      setEntryCategory('Catatan Harian');
    }
    showToast(nextLang === 'en' ? 'Language switched to English' : 'Bahasa ditukar ke Bahasa Melayu');
  };

  // Set initial form time
  const setFormTimeToDate = useCallback((d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const val = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    setFormDateTime(val);
  }, []);

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    // Load entries
    try {
      const stored = localStorage.getItem('mydiary_entries');
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {}

    // Load reminder settings
    try {
      const rTime = localStorage.getItem('mydiary_reminder_time');
      if (rTime) setReminderTime(rTime);
      const rFreq = localStorage.getItem('mydiary_reminder_freq');
      if (rFreq) setReminderFrequency(rFreq as any);
      const rEn = localStorage.getItem('mydiary_reminder_enabled');
      if (rEn !== null) setReminderEnabled(rEn === 'true');
      const rCh = localStorage.getItem('mydiary_reminder_chime');
      if (rCh !== null) setReminderChime(rCh === 'true');
    } catch {}

    // Load studio layout
    try {
      const c = localStorage.getItem('mydiary_text_color');
      if (c) setActiveTextColor(c);
      const p = localStorage.getItem('mydiary_block_positions');
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed.quote && (Math.abs(parsed.quote.x) > 400 || Math.abs(parsed.quote.y) > 450)) {
          parsed.quote = { x: 0, y: 0 };
        }
        if (parsed.header && (Math.abs(parsed.header.x) > 500 || Math.abs(parsed.header.y) > 600)) {
          parsed.header = { x: 0, y: 0 };
        }
        if (parsed.entries && (Math.abs(parsed.entries.x) > 500 || Math.abs(parsed.entries.y) > 600)) {
          parsed.entries = { x: 0, y: 0 };
        }
        setBlockPositions(parsed);
      }
      const f = localStorage.getItem('mydiary_font_sizes');
      if (f) setFontSizes(JSON.parse(f));
      const op = localStorage.getItem('mydiary_box_opacity');
      if (op !== null) setBoxOpacity(parseFloat(op));
    } catch {}

    // Notification permission status
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    setFormTimeToDate(new Date());
  }, [setFormTimeToDate]);

  // Save entries to localStorage
  const persistEntries = useCallback((newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    try {
      const cleanEntries = newEntries.map((e) => {
        const copy = { ...e };
        if (copy.video && copy.video.startsWith('data:video')) {
          saveVideoToIndexedDB(copy.id, copy.video);
          copy.hasIndexedVideo = true;
          delete copy.video;
        }
        if (copy.audioVoiceNote && copy.audioVoiceNote.startsWith('data:audio')) {
          saveAudioToIndexedDB(copy.id, copy.audioVoiceNote);
          copy.hasIndexedAudio = true;
          delete copy.audioVoiceNote;
        }
        return copy;
      });
      localStorage.setItem('mydiary_entries', JSON.stringify(cleanEntries));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, []);

  // 2. Real Live Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const dayNames = lang === 'ms'
        ? ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu']
        : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthNamesShort = lang === 'ms'
        ? ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      setCurrentTimeStr({
        hm: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
        sec: `:${pad(now.getSeconds())}`,
        day: dayNames[now.getDay()],
        date: `${now.getDate()} ${monthNamesShort[now.getMonth()]}`,
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // 3. Live Prayer Times with Aladhan API + Fallback
  const fetchPrayers = useCallback(async (lat?: number, lng?: number) => {
    try {
      const ts = Math.floor(Date.now() / 1000);
      const url = lat && lng
        ? `https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lng}&method=11`
        : `https://api.aladhan.com/v1/timingsByCity/${ts}?city=Kuala%20Lumpur&country=Malaysia&method=11`;
      const res = await fetch(url);
      const json = await res.json();
      if (json && json.data && json.data.timings) {
        const timings = json.data.timings;
        const now = new Date();
        const list = [
          { k: 'Fajr', l: lang === 'ms' ? 'Subuh' : 'Fajr' },
          { k: 'Sunrise', l: lang === 'ms' ? 'Syuruk' : 'Sunrise' },
          { k: 'Dhuhr', l: lang === 'ms' ? 'Zohor' : 'Dhuhr' },
          { k: 'Asr', l: lang === 'ms' ? 'Asar' : 'Asr' },
          { k: 'Maghrib', l: lang === 'ms' ? 'Maghrib' : 'Maghrib' },
          { k: 'Isha', l: lang === 'ms' ? 'Isyak' : 'Isha' },
        ];
        let nextP: any = null;
        for (const p of list) {
          if (timings[p.k]) {
            const [h, m] = timings[p.k].split(' ')[0].split(':').map(Number);
            const pD = new Date();
            pD.setHours(h, m, 0, 0);
            if (pD > now) {
              const diff = Math.floor((pD.getTime() - now.getTime()) / 60000);
              nextP = { name: p.l, time: timings[p.k].split(' ')[0], diff };
              break;
            }
          }
        }
        if (!nextP) {
          nextP = { name: lang === 'ms' ? 'Subuh' : 'Fajr', time: timings.Fajr.split(' ')[0], diff: 360 };
        }
        setPrayerData({
          name: nextP.name,
          time: nextP.time,
          countdown: `${Math.floor(nextP.diff / 60)}h ${nextP.diff % 60}m ${t.prayerMinsLeft}`,
        });
      }
    } catch {
      setPrayerData({
        name: lang === 'ms' ? 'Subuh' : 'Fajr',
        time: '05:48',
        countdown: `05:48 (${lang === 'ms' ? 'Waktu Piawai' : 'Standard'})`,
      });
    }
  }, [lang, t.prayerMinsLeft]);

  const requestPrayerLocation = useCallback(() => {
    showToast(lang === 'ms' ? 'Mengemas kini lokasi solat...' : 'Updating prayer location...');
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchPrayers(pos.coords.latitude, pos.coords.longitude),
        () => fetchPrayers(),
        { timeout: 8000 }
      );
    } else {
      fetchPrayers();
    }
  }, [fetchPrayers, lang, showToast]);

  useEffect(() => {
    requestPrayerLocation();
  }, [requestPrayerLocation]);

  // 4. Background Golden Dust Particle Canvas
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const dots = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vy: -Math.random() * 0.4 - 0.1,
      vx: (Math.random() - 0.5) * 0.2,
    }));

    let animId: number;
    function anim() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.y += d.vy;
        d.x += d.vx;
        if (d.y < 0) d.y = h;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.45)';
        ctx.fill();
      });
      animId = requestAnimationFrame(anim);
    }
    anim();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 5. Daily Motivational Quote of the Day
  const todayDayOfMonth = new Date().getDate();
  const currentQuote = useMemo(() => {
    const quotes = lang === 'ms' ? DAILY_QUOTES_MS : DAILY_QUOTES_EN;
    return quotes[(todayDayOfMonth - 1) % quotes.length];
  }, [lang, todayDayOfMonth]);

  // 6. Real-Time Scheduled Daily Reminder Notification Check
  useEffect(() => {
    if (!reminderEnabled || !reminderTime) return;

    let lastFiredDateStr = '';

    const checkReminder = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekday = currentDay >= 1 && currentDay <= 5;
      const isWeekend = currentDay === 0 || currentDay === 6;

      if (reminderFrequency === 'weekdays' && !isWeekday) return;
      if (reminderFrequency === 'weekends' && !isWeekend) return;

      const pad = (n: number) => String(n).padStart(2, '0');
      const nowHM = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
      const todayDateKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${nowHM}`;

      if (nowHM === reminderTime && lastFiredDateStr !== todayDateKey) {
        lastFiredDateStr = todayDateKey;

        // Play chime if enabled
        if (reminderChime) {
          playGentleChime();
        }

        // Show Browser Notification if permitted
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification(t.reminderNotificationTitle, {
              body: t.reminderNotificationBody,
              icon: 'https://i.postimg.cc/vm141QYg/1793143031058.jpg',
            });
          } catch {}
        }

        // Always show in-app toast
        showToast(`⏰ ${t.reminderNotificationTitle}: ${t.reminderNotificationBody}`);
      }
    };

    const interval = setInterval(checkReminder, 20000);
    checkReminder();
    return () => clearInterval(interval);
  }, [reminderEnabled, reminderTime, reminderFrequency, reminderChime, t, showToast]);

  // Request Notification Permission
  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast(lang === 'ms' ? 'Pelayar tidak menyokong notifikasi' : 'Browser does not support notifications');
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === 'granted') {
        showToast(lang === 'ms' ? 'Notifikasi berjaya diaktifkan!' : 'Notifications enabled successfully!');
      } else {
        showToast(lang === 'ms' ? 'Kebenaran notifikasi ditolak' : 'Notification permission was denied');
      }
    } catch {}
  };

  const testDailyNotificationNow = () => {
    if (reminderChime) {
      playGentleChime();
    }
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(t.reminderNotificationTitle, {
          body: t.reminderNotificationBody,
          icon: 'https://i.postimg.cc/vm141QYg/1793143031058.jpg',
        });
      } catch {}
    }
    showToast(`🔔 Test: ${t.reminderNotificationTitle}`);
  };

  // 7. Device Calendar Sync (.ics export)
  const downloadIcsFile = (filename: string, icsContent: string) => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(lang === 'ms' ? `Fail kalendar ${filename} dimuat turun!` : `Calendar file ${filename} downloaded!`);
  };

  // Option A: Daily Recurring Alarm in Device Calendar
  const exportDailyReminderIcs = () => {
    const [h, m] = reminderTime.split(':').map(Number);
    const now = new Date();
    now.setHours(h || 9, m || 0, 0, 0);

    const pad = (n: number) => String(n).padStart(2, '0');
    const startIso = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(now.getHours())}${pad(now.getMinutes())}00`;
    const endIso = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(now.getHours() + 1)}${pad(now.getMinutes())}00`;

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyDiary//Daily Reflection Reminder//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:mydiary-daily-alarm-${Date.now()}@mydiary.app
DTSTAMP:${startIso}Z
DTSTART:${startIso}
DTEND:${endIso}
RRULE:FREQ=DAILY
SUMMARY:🌸 MyDiary - Daily Reflection & Journaling
DESCRIPTION:Time to pause, reflect, and journal your life memories in MyDiary.
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:Time to write in MyDiary!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    downloadIcsFile(`MyDiary_Daily_Alarm_${reminderTime.replace(':', '')}.ics`, ics);
    setIsCalendarModalOpen(false);
  };

  // Option B: Export All Entries as Calendar Events
  const exportAllEntriesIcs = () => {
    if (entries.length === 0) {
      showToast(t.noEntries);
      return;
    }

    const pad = (n: number) => String(n).padStart(2, '0');
    const formatIcsDate = (iso: string) => {
      const d = new Date(iso);
      return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    };

    const events = entries.map((e) => {
      const start = formatIcsDate(e.timestamp);
      const dEnd = new Date(new Date(e.timestamp).getTime() + 1800000);
      const end = formatIcsDate(dEnd.toISOString());
      const safeTitle = e.title.replace(/(\r\n|\n|\r)/gm, ' ');
      const safeDesc = `${e.mood} | Category: ${e.category}\n\n${e.content.slice(0, 300)}...`.replace(/(\r\n|\n|\r)/gm, '\\n');

      return `BEGIN:VEVENT
UID:mydiary-entry-${e.id}@mydiary.app
DTSTAMP:${start}Z
DTSTART:${start}
DTEND:${end}
SUMMARY:[MyDiary] ${safeTitle}
DESCRIPTION:${safeDesc}
CATEGORIES:${e.category}
END:VEVENT`;
    }).join('\n');

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyDiary//Journal Entries Sync//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${events}
END:VCALENDAR`;

    downloadIcsFile(`MyDiary_All_Entries_${entries.length}.ics`, ics);
    setIsCalendarModalOpen(false);
  };

  // Option C: Export Current Entry in Editor
  const exportCurrentEntryIcs = () => {
    if (!entryTitle.trim()) {
      showToast(lang === 'ms' ? 'Sila isikan tajuk sebelum sinkron!' : 'Please enter a title first!');
      return;
    }
    const d = formDateTime ? new Date(formDateTime) : new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const start = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const dEnd = new Date(d.getTime() + 3600000);
    const end = `${dEnd.getFullYear()}${pad(dEnd.getMonth() + 1)}${pad(dEnd.getDate())}T${pad(dEnd.getHours())}${pad(dEnd.getMinutes())}00`;

    const safeTitle = entryTitle.replace(/(\r\n|\n|\r)/gm, ' ');
    const safeDesc = `${entryMood} | Category: ${entryCategory}\n\n${entryContent}`.replace(/(\r\n|\n|\r)/gm, '\\n');

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyDiary//Single Entry//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:mydiary-current-${Date.now()}@mydiary.app
DTSTAMP:${start}Z
DTSTART:${start}
DTEND:${end}
SUMMARY:[MyDiary] ${safeTitle}
DESCRIPTION:${safeDesc}
CATEGORIES:${entryCategory}
END:VEVENT
END:VCALENDAR`;

    downloadIcsFile(`MyDiary_Entry_${start.slice(0, 8)}.ics`, ics);
    setIsCalendarModalOpen(false);
  };

  // Google Calendar Web Link
  const handleGoogleCalendarWeb = () => {
    if (!entryTitle.trim()) {
      showToast(lang === 'ms' ? 'Sila isikan tajuk sebelum ke Google Calendar!' : 'Please fill in title first!');
      return;
    }
    const d = formDateTime ? new Date(formDateTime) : new Date();
    const start = d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const end = new Date(d.getTime() + 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      '[MyDiary] ' + entryTitle
    )}&dates=${start}/${end}&details=${encodeURIComponent(entryMood + '\n\n' + entryContent)}`;
    window.open(url, '_blank');
  };

  // 9. Photo & Video Upload / Crop
  const cropImageToSquare = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 600, 600);
          resolve(canvas.toDataURL('image/jpeg', 0.88));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handlePhotoFiles = async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    const available = 10 - attachedPhotos.length;
    if (available <= 0) {
      showToast(lang === 'ms' ? 'Slot gambar sudah penuh (Maks 10 foto)!' : 'Photo slot full (Max 10 photos)!');
      return;
    }
    const files = Array.from(fileList).slice(0, available);
    const newCropped: string[] = [];
    for (const f of files) {
      const dataUrl = await new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = (e) => res((e.target?.result as string) || '');
        r.readAsDataURL(f);
      });
      const cropped = await cropImageToSquare(dataUrl);
      newCropped.push(cropped);
    }
    setAttachedPhotos((prev) => {
      const updated = [...prev, ...newCropped];
      setPhotoCursor(updated.length - 1);
      return updated;
    });
    showToast(`${files.length} ${lang === 'ms' ? 'foto berjaya dilampirkan!' : 'photos attached!'}`);
  };

  const handleVideoFile = (file: File | null) => {
    if (!file) return;
    if (attachedVideoUrl || attachedVideoBlob) {
      showToast(lang === 'ms' ? 'Hanya 1 slot video dibenarkan!' : 'Only 1 video slot allowed!');
      return;
    }
    setAttachedVideoBlob(file);
    const url = URL.createObjectURL(file);
    setAttachedVideoUrl(url);
    showToast(lang === 'ms' ? 'Fail video sedia disimpan!' : 'Video ready to save!');
  };

  // 10. WebRTC Camera System (Photo 1:1 & Video 1:1)
  const startCamera = async (mode: 'photo' | 'video') => {
    setCameraMode(mode);
    openModal('camera', () => setIsCameraModalOpen(true));
    setIsRecording(false);
    setRecTimer(0);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (mode === 'photo') directPhotoInputRef.current?.click();
      else directVideoInputRef.current?.click();
      setIsCameraModalOpen(false);
      return;
    }

    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: mode === 'video',
      });
      mediaStreamRef.current = stream;
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
        cameraVideoRef.current.play();
      }
    } catch {
      try {
        const streamFallback = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        mediaStreamRef.current = streamFallback;
        if (cameraVideoRef.current) {
          cameraVideoRef.current.srcObject = streamFallback;
          cameraVideoRef.current.play();
        }
      } catch {
        showToast(lang === 'ms' ? 'Kamera perkakasan digunakan' : 'Opening hardware camera');
        setIsCameraModalOpen(false);
        if (mode === 'photo') directPhotoInputRef.current?.click();
        else directVideoInputRef.current?.click();
      }
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsCameraModalOpen(false);
  };

  const toggleCameraFacing = async () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: nextFacing } },
        audio: cameraMode === 'video',
      });
      mediaStreamRef.current = stream;
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
        cameraVideoRef.current.play();
      }
    } catch {
      startCamera(cameraMode);
    }
  };

  const capturePhotoSnapshot = () => {
    const video = cameraVideoRef.current;
    if (!video) return;
    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    const size = Math.min(vw, vh);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, (vw - size) / 2, (vh - size) / 2, size, size, 0, 0, 600, 600);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      if (attachedPhotos.length < 10) {
        setAttachedPhotos((prev) => [...prev, dataUrl]);
        setPhotoCursor(attachedPhotos.length);
        showToast(lang === 'ms' ? `Foto 1:1 berjaya ditangkap (${attachedPhotos.length + 1}/10)!` : `Photo 1:1 captured (${attachedPhotos.length + 1}/10)!`);
      }
    }
    stopCamera();
  };

  const toggleVideoRecording = () => {
    if (!isRecording) {
      if (!mediaStreamRef.current) return;
      recordedChunksRef.current = [];
      let mimeType = 'video/webm';
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
        mimeType = 'video/mp4;codecs=avc1';
      }

      try {
        const recorder = new MediaRecorder(mediaStreamRef.current, { mimeType });
        mediaRecorderRef.current = recorder;
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: mimeType });
          setAttachedVideoBlob(blob);
          const url = URL.createObjectURL(blob);
          setAttachedVideoUrl(url);
          showToast(lang === 'ms' ? 'Video 1:1 berjaya dirakam!' : 'Video 1:1 recorded!');
          stopCamera();
        };
        recorder.start(250);
        setIsRecording(true);
        setRecTimer(0);
      } catch {
        showToast('MediaRecorder error on this browser.');
      }
    } else {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  // Video timer effect
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setRecTimer((prev) => {
        if (prev >= 15) {
          if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
          setIsRecording(false);
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  // 9b. Voice Recording Methods
  const cleanupAudioRecordingResources = useCallback(() => {
    if (audioTimerIntervalRef.current) {
      clearInterval(audioTimerIntervalRef.current);
      audioTimerIntervalRef.current = null;
    }
    if (audioVisualizerAnimRef.current) {
      cancelAnimationFrame(audioVisualizerAnimRef.current);
      audioVisualizerAnimRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    audioAnalyserRef.current = null;
  }, []);

  const stopAudioRecording = useCallback(() => {
    if (audioRecorderRef.current && audioRecorderRef.current.state !== 'inactive') {
      try {
        audioRecorderRef.current.stop();
      } catch {}
    }
    setIsAudioRecording(false);
    setIsAudioPaused(false);
  }, []);

  const cancelAudioRecording = useCallback(() => {
    audioChunksRef.current = [];
    if (audioRecorderRef.current && audioRecorderRef.current.state !== 'inactive') {
      try {
        audioRecorderRef.current.stop();
      } catch {}
    }
    cleanupAudioRecordingResources();
    setIsAudioRecording(false);
    setIsAudioPaused(false);
    setAudioRecSeconds(0);
    showToast(lang === 'ms' ? 'Rakaman suara dibatalkan.' : 'Voice recording cancelled.');
  }, [cleanupAudioRecordingResources, lang, showToast]);

  const pauseResumeAudioRecording = useCallback(() => {
    const recorder = audioRecorderRef.current;
    if (!recorder || !isAudioRecording) return;
    if (isAudioPaused) {
      try {
        recorder.resume();
        setIsAudioPaused(false);
      } catch {}
    } else {
      try {
        recorder.pause();
        setIsAudioPaused(true);
      } catch {}
    }
  }, [isAudioPaused, isAudioRecording]);

  const startAudioRecording = useCallback(async () => {
    if (isAudioRecording) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast(t.micAccessError);
      directAudioInputRef.current?.click();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      // Realtime AudioContext equalizer visualizer
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const source = ctx.createMediaStreamSource(stream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          audioAnalyserRef.current = analyser;

          const updateVisualizer = () => {
            if (!analyser) return;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            const bars: number[] = [];
            const step = Math.max(1, Math.floor(dataArray.length / 12));
            for (let i = 0; i < 12; i++) {
              const val = dataArray[i * step] || 0;
              const pct = Math.max(12, Math.min(95, Math.round((val / 255) * 100)));
              bars.push(pct);
            }
            setAudioVisualizerLevels(bars);
            audioVisualizerAnimRef.current = requestAnimationFrame(updateVisualizer);
          };
          audioVisualizerAnimRef.current = requestAnimationFrame(updateVisualizer);
        }
      } catch (e) {
        console.warn('Visualizer AudioContext unavailable:', e);
      }

      audioChunksRef.current = [];
      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
          mimeType = 'audio/ogg';
        }
      }

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      let currentSec = 0;
      recorder.onstop = () => {
        const actualMime = recorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: actualMime });
        if (blob.size > 0) {
          setAttachedAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAttachedAudioUrl(url);
          setAttachedAudioDuration(currentSec);
          showToast(t.voiceNoteAttached);
        }
        cleanupAudioRecordingResources();
      };

      recorder.start(250);
      setIsAudioRecording(true);
      setIsAudioPaused(false);
      setAudioRecSeconds(0);

      if (audioTimerIntervalRef.current) clearInterval(audioTimerIntervalRef.current);
      audioTimerIntervalRef.current = setInterval(() => {
        currentSec += 1;
        setAudioRecSeconds(currentSec);
        if (currentSec >= 300) {
          stopAudioRecording();
        }
      }, 1000);

    } catch (err) {
      console.error('Microphone error:', err);
      showToast(t.micAccessError);
    }
  }, [cleanupAudioRecordingResources, isAudioRecording, showToast, stopAudioRecording, t.micAccessError, t.voiceNoteAttached]);

  const handleAudioFile = useCallback((file: File | null) => {
    if (!file) return;
    setAttachedAudioBlob(file);
    const url = URL.createObjectURL(file);
    setAttachedAudioUrl(url);
    const a = new Audio(url);
    a.onloadedmetadata = () => {
      if (a.duration && !isNaN(a.duration)) {
        setAttachedAudioDuration(Math.round(a.duration));
      }
    };
    showToast(t.voiceNoteAttached);
  }, [showToast, t.voiceNoteAttached]);

  const removeAttachedAudio = useCallback(() => {
    if (attachedAudioUrl) {
      URL.revokeObjectURL(attachedAudioUrl);
    }
    setAttachedAudioUrl(null);
    setAttachedAudioBlob(null);
    setAttachedAudioDuration(0);
    showToast(t.voiceNoteDeleted);
  }, [attachedAudioUrl, showToast, t.voiceNoteDeleted]);

  useEffect(() => {
    return () => {
      cleanupAudioRecordingResources();
    };
  }, [cleanupAudioRecordingResources]);

  // 10. Gesture Back & Navigation Handler (prevents app exit on swipe back!)
  const handleBackNavigation = useCallback((): boolean => {
    // 0. If Voice Note is currently recording, stop and save recording
    if (isAudioRecordingRef.current) {
      stopAudioRecording();
      showToast(langRef.current === 'ms' ? 'Rakaman suara disimpan.' : 'Voice note saved.');
      return true;
    }
    // 1. If Studio is open, close studio
    if (isStudioOpenRef.current) {
      setIsStudioOpen(false);
      return true;
    }
    // 2. If Archive is open, close archive
    if (isArchiveOpenRef.current) {
      setIsArchiveOpen(false);
      return true;
    }
    // 3. If Theme Modal is open, close it
    if (isThemeModalOpenRef.current) {
      setIsThemeModalOpen(false);
      return true;
    }
    // 4. If Reminder Modal is open, close it
    if (isReminderModalOpenRef.current) {
      setIsReminderModalOpen(false);
      return true;
    }
    // 5. If Calendar Modal is open, close it
    if (isCalendarModalOpenRef.current) {
      setIsCalendarModalOpen(false);
      return true;
    }
    // 6. If Camera Modal is open, stop camera and close
    if (isCameraModalOpenRef.current) {
      stopCamera();
      return true;
    }
    // 8. If a date filter is active, clear date filter
    if (filteredDateRef.current) {
      setFilteredDate(null);
      showToast(langRef.current === 'ms' ? 'Penapis tarikh dibatalkan' : 'Date filter cleared');
      return true;
    }

    // 10. On main screen: Double-back to exit protection!
    const now = Date.now();
    if (now - lastBackPressRef.current < 2500) {
      showToast(langRef.current === 'ms' ? 'Keluar dari MyDiary' : 'Exiting MyDiary');
      return false;
    } else {
      lastBackPressRef.current = now;
      try {
        window.history.pushState({ page: 'app-home' }, '');
      } catch {}
      showToast(
        langRef.current === 'ms'
          ? 'Tekan atau leret kembali sekali lagi untuk keluar'
          : 'Press or swipe back again to exit'
      );
      return true;
    }
  }, [showToast]);

  // Mobile Back Gesture & History Listener
  useEffect(() => {
    try {
      window.history.replaceState({ page: 'app-root' }, '');
      window.history.pushState({ page: 'app-home' }, '');
    } catch {}

    const handlePopState = (e: PopStateEvent) => {
      const handled = handleBackNavigation();
      if (handled) {
        e.preventDefault?.();
      }
    };

    window.addEventListener('popstate', handlePopState);

    // In-App Touch Edge Swipe Back Gesture Detector
    let edgeStartX = 0;
    let edgeStartY = 0;
    let isEdgeTouch = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length === 1) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        if (x <= 36 || x >= window.innerWidth - 36) {
          edgeStartX = x;
          edgeStartY = y;
          isEdgeTouch = true;
        } else {
          isEdgeTouch = false;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isEdgeTouch) return;
      isEdgeTouch = false;
      if (e.changedTouches && e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - edgeStartX;
        const dy = Math.abs(endY - edgeStartY);

        const isLeftEdgeSwipe = edgeStartX <= 36 && dx > 60 && dy < 60;
        const isRightEdgeSwipe = edgeStartX >= window.innerWidth - 36 && dx < -60 && dy < 60;

        if (isLeftEdgeSwipe || isRightEdgeSwipe) {
          handleBackNavigation();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleBackNavigation]);

  // 11. Form Submission (Create Entry)
  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryTitle.trim() || !entryContent.trim()) {
      showToast(lang === 'ms' ? 'Sila isikan tajuk dan kandungan catatan!' : 'Please fill in title and content!');
      return;
    }

    const newId = 'entry_' + Date.now();
    let hasVideoInDB = false;
    let hasAudioInDB = false;

    if (attachedVideoBlob) {
      await saveVideoToIndexedDB(newId, attachedVideoBlob);
      hasVideoInDB = true;
    }

    if (attachedAudioBlob) {
      await saveAudioToIndexedDB(newId, attachedAudioBlob);
      hasAudioInDB = true;
    }

    const newEntry: JournalEntry = {
      id: newId,
      title: entryTitle.trim(),
      mood: entryMood,
      category: entryCategory,
      content: entryContent,
      timestamp: formDateTime ? new Date(formDateTime).toISOString() : new Date().toISOString(),
      photos: [...attachedPhotos],
      video: null,
      hasIndexedVideo: hasVideoInDB,
      audioVoiceNote: null,
      hasIndexedAudio: hasAudioInDB,
      audioDuration: attachedAudioDuration || 0,
    };

    const updated = [newEntry, ...entries];
    persistEntries(updated);

    // Reset Form
    setEntryTitle('');
    setEntryContent('');
    setAttachedPhotos([]);
    setPhotoCursor(0);
    setAttachedVideoUrl(null);
    setAttachedVideoBlob(null);
    setAttachedAudioUrl(null);
    setAttachedAudioBlob(null);
    setAttachedAudioDuration(0);
    setFormTimeToDate(new Date());

    showToast(lang === 'ms' ? 'Catatan berjaya disimpan ke Arkib!' : 'Entry successfully saved to Archive!');
  };

  // Delete Entry
  const handleDeleteEntry = async (id: string) => {
    await deleteVideoFromIndexedDB(id);
    await deleteAudioFromIndexedDB(id);
    const updated = entries.filter((e) => e.id !== id);
    persistEntries(updated);
    showToast(lang === 'ms' ? 'Catatan dipadam.' : 'Entry deleted.');
  };

  // Load IndexedDB videos & audio voice notes for archive display
  useEffect(() => {
    entries.forEach(async (entry) => {
      if (entry.hasIndexedVideo && !loadedVideosMap[entry.id]) {
        const stored = await getVideoFromIndexedDB(entry.id);
        if (stored) {
          const url = stored instanceof Blob ? URL.createObjectURL(stored) : stored;
          setLoadedVideosMap((prev) => ({ ...prev, [entry.id]: url }));
        }
      }
      if (entry.hasIndexedAudio && !loadedAudiosMap[entry.id]) {
        const stored = await getAudioFromIndexedDB(entry.id);
        if (stored) {
          const url = stored instanceof Blob ? URL.createObjectURL(stored) : stored;
          setLoadedAudiosMap((prev) => ({ ...prev, [entry.id]: url }));
        }
      }
    });
  }, [entries, loadedVideosMap, loadedAudiosMap]);

  // 12. Golden Dust Shower Animation for Archive Drawer
  useEffect(() => {
    if (!isArchiveOpen) return;
    const canvas = archiveDustCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    const h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const sparks = Array.from({ length: 65 }, () => ({
      x: Math.random() * w,
      y: -Math.random() * 80,
      r: Math.random() * 2.8 + 1,
      vy: Math.random() * 3.5 + 2,
      vx: (Math.random() - 0.5) * 1.5,
      alpha: Math.random() * 0.8 + 0.2,
      decay: Math.random() * 0.006 + 0.003,
    }));

    let showerId: number;
    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      sparks.forEach((s) => {
        s.y += s.vy;
        s.x += s.vx;
        s.alpha -= s.decay;
        if (s.alpha > 0 && s.y < h) {
          alive = true;
          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${s.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#fbbf24';
          ctx.fill();
          ctx.restore();
        }
      });
      if (alive) showerId = requestAnimationFrame(step);
      else ctx.clearRect(0, 0, w, h);
    }
    step();
    return () => cancelAnimationFrame(showerId);
  }, [isArchiveOpen]);

  // 13. A4 Studio Document HTML Generator
  const generateA4Html = useCallback(() => {
    const tpl = TEMPLATE_METADATA[selectedTemplateId] || TEMPLATE_METADATA.template_alps_1;
    const isLandscape = docOrientation === 'landscape';
    const pageWidthCss = isLandscape ? '297mm' : '210mm';
    const pageHeightCss = isLandscape ? '210mm' : '297mm';
    const pageWidthPx = isLandscape ? '1123px' : '794px';
    const pageHeightPx = isLandscape ? '794px' : '1123px';

    const isZeroBox = boxOpacity <= 0.01;
    const computedBg = isZeroBox ? 'transparent !important' : `rgba(255, 255, 255, ${boxOpacity}) !important`;
    const computedBackdrop = isZeroBox ? 'none !important' : 'blur(5px)';
    const computedBoxShadow = isZeroBox ? 'none !important' : '0 4px 18px rgba(0, 0, 0, 0.12)';
    const computedBorder = isZeroBox ? 'none !important' : `1px solid rgba(255, 255, 255, ${Math.min(1, boxOpacity + 0.25)})`;
    const computedPadding = isZeroBox ? '2px 4px' : '10px 16px';

    // Dynamic Time & Mood font size that scales proportionally with the Body font slider!
    const metaFontSize = Math.max(7.5, Math.round(fontSizes.body * 0.78 * 10) / 10);

    // Filter entries by period
    const now = new Date();
    let daysCount = 7;
    if (exportPeriod === '1day') daysCount = 1;
    else if (exportPeriod === '30days') daysCount = 30;

    const cutoff = now.getTime() - daysCount * 24 * 60 * 60 * 1000;
    let periodEntries = entries.filter((e) => new Date(e.timestamp).getTime() >= cutoff);
    if (periodEntries.length === 0) {
      periodEntries = entries.slice(0, Math.min(daysCount, entries.length));
    }
    if (periodEntries.length === 0) {
      periodEntries = [
        {
          id: 'demo_1',
          title: entryTitle.trim() || (lang === 'ms' ? 'Kenangan & Perjalanan Hidup' : 'Life Journey & Memories'),
          content: entryContent.trim() || (lang === 'ms' ? 'Setiap detik kecil yang kita lalui hari ini adalah khazanah indah di masa hadapan...' : 'Every small moment we live today becomes a cherished memory for tomorrow...'),
          mood: entryMood || (lang === 'ms' ? '🌸 Tenang & Bahagia' : '🌸 Peaceful & Happy'),
          category: entryCategory || (lang === 'ms' ? 'Catatan Harian' : 'Daily Journal'),
          timestamp: formDateTime ? new Date(formDateTime).toISOString() : new Date().toISOString(),
          photos: attachedPhotos.length > 0 ? attachedPhotos : [],
          video: attachedVideoUrl || null,
          audioVoiceNote: attachedAudioUrl || null,
        },
      ];
    }

    const safeQuoteX = Math.abs(blockPositions.quote?.x || 0) > 400 ? 0 : (blockPositions.quote?.x || 0);
    const safeQuoteY = Math.abs(blockPositions.quote?.y || 0) > 450 ? 0 : (blockPositions.quote?.y || 0);

    const pagesHtml = periodEntries.map((data, index) => {
      const d = new Date(data.timestamp);
      const dateTitle = d.toLocaleDateString(lang === 'ms' ? 'ms-MY' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).toUpperCase();
      const timeStr = d.toLocaleTimeString(lang === 'ms' ? 'ms-MY' : 'en-US', { hour: '2-digit', minute: '2-digit' });

      // Photos section
      let mediaHtml = '';
      if (data.photos && data.photos.length > 0) {
        mediaHtml += `<div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">` +
          data.photos.map((p) => `<img src="${p}" style="width:72px; height:72px; object-fit:cover; border-radius:6px; border:1.5px solid #fff; box-shadow:0 2px 5px rgba(0,0,0,0.25);">`).join('') +
          `</div>`;
      }

      // Video section for E-Book & Preview (hidden during print for PDF generation)
      const videoSrc = loadedVideosMap[data.id] || data.video || (data.id === 'demo_1' ? attachedVideoUrl : null);
      if (videoSrc) {
        mediaHtml += `
          <div class="ebook-video-wrapper" style="margin-top:8px; border-radius:8px; overflow:hidden; background:#000; border:1.5px solid rgba(255,255,255,0.85); box-shadow:0 3px 8px rgba(0,0,0,0.3); max-width:280px;">
            <video src="${videoSrc}" controls playsinline preload="metadata" style="width:100%; max-height:175px; display:block; object-fit:contain; background:#000;">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
      }

      // Voice note audio section for E-Book & Preview (hidden during print for PDF generation)
      const audioSrc = loadedAudiosMap[data.id] || data.audioVoiceNote || (data.id === 'demo_1' ? attachedAudioUrl : null);
      if (audioSrc) {
        mediaHtml += `
          <div class="ebook-audio-wrapper" style="margin-top:8px; border-radius:8px; background:rgba(255,255,255,0.85); border:1px solid rgba(139,92,246,0.35); padding:6px 10px; max-width:280px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <div style="font-size:7.5pt; font-weight:700; color:#6d28d9; margin-bottom:4px; display:flex; align-items:center; gap:4px;">
              <span>🎙️</span> <span>${lang === 'ms' ? 'Nota Suara Jurnal' : 'Journal Voice Note'}</span>
            </div>
            <audio src="${audioSrc}" controls preload="metadata" style="width:100%; height:32px; display:block;"></audio>
          </div>
        `;
      }

      return `
        <div class="a4-sheet" style="page-break-after: always; position: relative;">
          <img class="canvas-bg" src="${tpl.bgUrl}" alt="Canvas" onerror="this.style.display='none'">

          <div class="free-drag-block" id="dragBlockHeader" data-block-id="header" style="transform: translate(${blockPositions.header.x}px, ${blockPositions.header.y}px);">
            <div class="date-title">${dateTitle}</div>
            <div style="font-size:8pt; font-weight:600; color:${activeTextColor}; opacity:0.85;">${lang === 'ms' ? 'HALAMAN' : 'PAGE'} ${index + 1} / ${periodEntries.length}</div>
            <div class="divider-bar"></div>
          </div>

          <div class="free-drag-block" id="dragBlockEntries" data-block-id="entries" style="transform: translate(${blockPositions.entries.x}px, ${blockPositions.entries.y}px);">
            <div class="entry-title">${data.title}</div>
            <div class="entry-meta" style="font-size:${metaFontSize}pt; color:${activeTextColor}; margin-bottom:6px; opacity:0.92; font-weight:600; line-height:1.35; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span>🕒 ${timeStr}</span>
              <span>•</span>
              <span>${data.mood}</span>
            </div>
            <div class="entry-text">${data.content}</div>
            ${mediaHtml}
          </div>

          <div class="free-drag-block" id="dragBlockQuote" data-block-id="quote" style="transform: translate(${safeQuoteX}px, ${safeQuoteY}px);">
            <div class="quote-bradley">“${currentQuote || (lang === 'ms' ? DAILY_QUOTES_MS[0] : DAILY_QUOTES_EN[0])}”</div>
            <div style="font-size:8pt; font-weight:600; color:${activeTextColor}; opacity:0.85; margin-top:3px;">MyDiary • Life Journal Archive</div>
          </div>
        </div>
      `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<style>
  @page { size: ${pageWidthCss} ${pageHeightCss}; margin: 0; }
  *, *::before, *::after { box-sizing: border-box !important; margin: 0; padding: 0; }
  html, body { width: 100%; background: #fdfbf7; user-select: none; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .a4-sheet { position: relative; width: ${pageWidthPx}; height: ${pageHeightPx}; background: #fdfbf7; overflow: hidden; margin: 0 auto; }
  .canvas-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; z-index: 1; }
  .free-drag-block {
    position: absolute; z-index: 10; cursor: grab; touch-action: none; -webkit-user-select: none; user-select: none; padding: ${computedPadding};
    border-radius: 12px; background: ${computedBg}; backdrop-filter: ${computedBackdrop};
    -webkit-backdrop-filter: ${computedBackdrop}; box-shadow: ${computedBoxShadow}; border: ${computedBorder};
    max-width: ${isLandscape ? '580px' : '640px'}; overflow-wrap: break-word !important; word-wrap: break-word !important; word-break: break-word !important;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
  }
  .free-drag-block:active, .free-drag-block.is-dragging {
    cursor: grabbing; border-color: rgba(180, 83, 9, 0.9) !important;
    box-shadow: 0 10px 32px rgba(180, 83, 9, 0.45) !important; z-index: 999 !important;
  }
  #dragBlockHeader { top: ${isLandscape ? '35px' : '65px'}; left: ${isLandscape ? '65px' : '75px'}; }
  #dragBlockEntries { top: ${isLandscape ? '135px' : '165px'}; left: ${isLandscape ? '65px' : '75px'}; }
  #dragBlockQuote { top: ${isLandscape ? '640px' : '940px'}; left: ${isLandscape ? '131px' : '77px'}; text-align: center; width: ${isLandscape ? '860px' : '640px'}; max-width: min(92%, ${isLandscape ? '860px' : '640px'}); }
  .date-title { font-family: ${tpl.fontHeading}; font-size: ${fontSizes.heading}pt; font-weight: 700; color: ${activeTextColor}; line-height: 1.2; }
  .divider-bar { width: 100%; height: 1.5px; background: ${tpl.lineColor}; margin-top: 4px; }
  .entry-title { font-family: ${tpl.fontHeading}; font-size: ${fontSizes.heading * 0.88}pt; font-weight: 700; color: ${activeTextColor}; margin-bottom: 2px; }
  .entry-meta { font-family: ${tpl.fontBody}; font-size: ${metaFontSize}pt !important; color: ${activeTextColor}; }
  .entry-text { font-family: ${tpl.fontBody}; font-size: ${fontSizes.body}pt; color: ${activeTextColor}; line-height: 1.6; white-space: pre-wrap !important; word-break: break-word !important; }
  .quote-bradley { font-family: 'Caveat', cursive, sans-serif !important; font-size: ${fontSizes.quote}pt !important; font-weight: 700; color: ${activeTextColor} !important; text-align: center; line-height: 1.3; }
  .ebook-video-wrapper {
    margin-top: 8px; border-radius: 8px; overflow: hidden; background: #000;
    border: 1.5px solid rgba(255,255,255,0.85); box-shadow: 0 3px 8px rgba(0,0,0,0.3); max-width: 280px;
  }
  @media print {
    .ebook-video-wrapper, .ebook-audio-wrapper {
      display: none !important;
    }
  }
</style>
</head>
<body>
  ${pagesHtml}

  <script>
    (function() {
      const blocks = document.querySelectorAll('.free-drag-block');
      blocks.forEach(function(el) {
        const bId = el.getAttribute('data-block-id');
        let isDragging = false;
        let startTouchX = 0, startTouchY = 0;
        let initialBlockX = 0, initialBlockY = 0;
        let curX = 0, curY = 0;

        function onPointerDown(e) {
          isDragging = true;
          try { el.setPointerCapture(e.pointerId); } catch(err){}
          startTouchX = e.clientX;
          startTouchY = e.clientY;

          const style = window.getComputedStyle(el);
          const matrix = new DOMMatrixReadOnly(style.transform);
          initialBlockX = matrix.m41 || 0;
          initialBlockY = matrix.m42 || 0;
          curX = initialBlockX;
          curY = initialBlockY;

          el.classList.add('is-dragging');
          el.style.zIndex = '999';
          if (e.cancelable) e.preventDefault();
        }

        function onPointerMove(e) {
          if (!isDragging) return;
          const dx = e.clientX - startTouchX;
          const dy = e.clientY - startTouchY;

          curX = initialBlockX + dx;
          curY = initialBlockY + dy;

          // Hardware-accelerated direct transform for buttery smooth 60fps/120Hz drag without stutter!
          el.style.transform = 'translate(' + curX + 'px, ' + curY + 'px)';
          if (e.cancelable) e.preventDefault();
        }

        function onPointerUp(e) {
          if (!isDragging) return;
          isDragging = false;
          try { el.releasePointerCapture(e.pointerId); } catch(err){}
          el.classList.remove('is-dragging');
          el.style.zIndex = '10';

          // ONLY update parent state when finger is released to prevent re-render lag during dragging!
          try {
            window.parent.postMessage({ type: 'BLOCK_POSITION_SAVED', blockId: bId, x: Math.round(curX), y: Math.round(curY) }, '*');
          } catch(err){}
        }

        if (window.PointerEvent) {
          el.addEventListener('pointerdown', onPointerDown, { passive: false });
          el.addEventListener('pointermove', onPointerMove, { passive: false });
          el.addEventListener('pointerup', onPointerUp, { passive: false });
          el.addEventListener('pointercancel', onPointerUp, { passive: false });
        } else {
          el.addEventListener('touchstart', function(e) {
            if (e.touches && e.touches[0]) {
              isDragging = true;
              startTouchX = e.touches[0].clientX;
              startTouchY = e.touches[0].clientY;
              const style = window.getComputedStyle(el);
              const matrix = new DOMMatrixReadOnly(style.transform);
              initialBlockX = matrix.m41 || 0;
              initialBlockY = matrix.m42 || 0;
              curX = initialBlockX;
              curY = initialBlockY;
              el.classList.add('is-dragging');
              el.style.zIndex = '999';
              if (e.cancelable) e.preventDefault();
            }
          }, { passive: false });

          window.addEventListener('touchmove', function(e) {
            if (!isDragging || !e.touches || !e.touches[0]) return;
            const dx = e.touches[0].clientX - startTouchX;
            const dy = e.touches[0].clientY - startTouchY;
            curX = initialBlockX + dx;
            curY = initialBlockY + dy;
            el.style.transform = 'translate(' + curX + 'px, ' + curY + 'px)';
            if (e.cancelable) e.preventDefault();
          }, { passive: false });

          window.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            el.classList.remove('is-dragging');
            el.style.zIndex = '10';
            try {
              window.parent.postMessage({ type: 'BLOCK_POSITION_SAVED', blockId: bId, x: Math.round(curX), y: Math.round(curY) }, '*');
            } catch(err){}
          });
        }
      });
    })();
  <\/script>
</body>
</html>`;
  }, [selectedTemplateId, docOrientation, boxOpacity, exportPeriod, entries, lang, blockPositions, activeTextColor, fontSizes, currentQuote, loadedVideosMap, entryTitle, entryContent, entryMood, entryCategory, formDateTime, attachedPhotos, attachedVideoUrl]);

  // Responsive Phone Fit Scaling calculation
  const autoScaleA4 = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const isL = docOrientation === 'landscape';
    const docW = isL ? 1123 : 794;
    const docH = isL ? 794 : 1123;

    // Viewport padding for mobile vs desktop
    const padX = window.innerWidth <= 640 ? 12 : 24;
    const padY = window.innerHeight <= 640 ? 12 : 24;

    const viewW = Math.max(80, vp.clientWidth - padX);
    const viewH = Math.max(80, vp.clientHeight - padY);

    const calculated = Math.min(viewW / docW, viewH / docH);
    setFitScale(calculated);
  }, [docOrientation]);

  useEffect(() => {
    if (isStudioOpen) {
      autoScaleA4();
      const t1 = setTimeout(autoScaleA4, 80);
      const t2 = setTimeout(autoScaleA4, 250);
      window.addEventListener('resize', autoScaleA4);
      window.addEventListener('orientationchange', autoScaleA4);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('resize', autoScaleA4);
        window.removeEventListener('orientationchange', autoScaleA4);
      };
    }
  }, [isStudioOpen, autoScaleA4]);

  // Listen to block moved message from iframe ONLY when finger is released
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (!e.data || e.data.type !== 'BLOCK_POSITION_SAVED') return;
      const { blockId, x, y } = e.data;
      if (blockId && typeof x === 'number' && typeof y === 'number') {
        isUpdatingFromDragRef.current = true;
        setBlockPositions((prev) => {
          const updated = {
            ...prev,
            [blockId]: { x: Math.round(x), y: Math.round(y) },
          };
          try {
            localStorage.setItem('mydiary_block_positions', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  // Update Studio Preview Iframe
  useEffect(() => {
    if (isStudioOpen && iframeRef.current) {
      if (isUpdatingFromDragRef.current) {
        // Element was already translated directly in the iframe DOM during drag.
        // Skip srcdoc reload to prevent iframe flicker/stutter when releasing finger!
        isUpdatingFromDragRef.current = false;
        return;
      }
      iframeRef.current.srcdoc = generateA4Html();
    }
  }, [isStudioOpen, generateA4Html]);

  // Print PDF
  const handlePrintPdf = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  };

  // Download Standalone E-Book HTML
  const handleDownloadEbook = () => {
    const docHtml = generateA4Html();
    const blob = new Blob([docHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MyDiary_EBook_${exportPeriod.toUpperCase()}_${new Date().toISOString().slice(0, 10)}.html`);
    link.click();
    URL.revokeObjectURL(url);
    showToast(lang === 'ms' ? 'E-Book HTML dimuat turun!' : 'E-Book HTML downloaded!');
  };

  // Calendar calculations
  const calendarDays = useMemo(() => {
    const y = calendarCursor.getFullYear();
    const m = calendarCursor.getMonth();
    const fDay = new Date(y, m, 1).getDay();
    const numDays = new Date(y, m + 1, 0).getDate();
    const today = new Date();

    const days: any[] = [];
    for (let i = 0; i < fDay; i++) {
      days.push({ empty: true, key: `empty-${i}` });
    }
    for (let d = 1; d <= numDays; d++) {
      const pad = (n: number) => String(n).padStart(2, '0');
      const dateStr = `${y}-${pad(m + 1)}-${pad(d)}`;
      const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
      const hasEntry = entries.some((e) => e.timestamp.startsWith(dateStr));
      const isActive = filteredDate === dateStr;
      days.push({ dayNumber: d, dateStr, isToday, hasEntry, isActive, key: `day-${d}` });
    }
    return days;
  }, [calendarCursor, entries, filteredDate]);

  // Filtered entries for archive
  const filteredArchiveEntries = useMemo(() => {
    let list = entries;
    if (filteredDate) {
      list = list.filter((e) => e.timestamp.startsWith(filteredDate));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(q) || e.content.toLowerCase().includes(q));
    }
    return list;
  }, [entries, filteredDate, searchQuery]);

  return (
    <>
      {/* Floating Dust Canvas */}
      <canvas ref={dustCanvasRef} id="dustCanvas" />

      {/* Hidden File Inputs */}
      <input ref={directPhotoInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => handlePhotoFiles(e.target.files)} />
      <input ref={directVideoInputRef} type="file" accept="video/*" capture="environment" style={{ display: 'none' }} onChange={(e) => handleVideoFile(e.target.files?.[0] || null)} />
      <input ref={directAudioInputRef} type="file" accept="audio/*" style={{ display: 'none' }} onChange={(e) => handleAudioFile(e.target.files?.[0] || null)} />

      <div className="app-wrapper">
        {/* HEADER */}
        <header className="main-header">
          <div className="brand-section">
            <img src="https://i.postimg.cc/vm141QYg/1793143031058.jpg" alt="MyDiary Logo" className="brand-logo-img" onError={(e: any) => { e.target.src = 'https://placehold.co/46x46/fd6c9e/ffffff?text=MD'; }} />
            <div>
              <h1 className="brand-title">My<span className="diary-text">Diary</span></h1>
              <p className="brand-subtitle">
                <i className="fa-solid fa-sparkles" style={{ color: 'var(--accent-color)' }} /> {t.brandSubtitle}
              </p>
            </div>
          </div>

          <div className="header-controls">
            <div className="time-prayer-cluster">
              {/* Live Clock Card */}
              <div className="live-clock-card" title="Live Clock">
                <i className="fa-regular fa-clock" style={{ color: 'var(--accent-color)', fontSize: '0.95rem' }} />
                <div className="clock-digits-group">
                  <span className="clock-main-time">{currentTimeStr.hm}</span>
                  <span className="clock-sec-badge">{currentTimeStr.sec}</span>
                </div>
                <div className="clock-date-sub">
                  <span>{currentTimeStr.day}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>{currentTimeStr.date}</span>
                </div>
              </div>

              {/* Prayer Times Live Badge */}
              <div className="prayer-live-badge" title={t.prayerUpdateHint} onClick={requestPrayerLocation}>
                <i className="fa-solid fa-mosque" style={{ color: '#10b981' }} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.74rem' }}>
                    <span>{prayerData.name} </span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-color)', fontWeight: 700 }}>{prayerData.time}</span>
                  </div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{prayerData.countdown}</span>
                </div>
              </div>
            </div>

            {/* Daily Reminder Notification Button */}
            <button
              type="button"
              className="action-btn-header"
              style={{ borderColor: reminderEnabled ? 'var(--accent-color)' : 'var(--border-color)', color: reminderEnabled ? 'var(--accent-color)' : 'inherit' }}
              title={t.dailyReminderBtn}
              onClick={() => openModal('reminder', () => setIsReminderModalOpen(true))}
            >
              <i className="fa-regular fa-bell" /> {t.dailyReminderBtn} ({reminderTime})
            </button>

            {/* Device Calendar Sync Button */}
            <button
              type="button"
              className="action-btn-header"
              title={t.calendarSyncBtn}
              onClick={() => openModal('calendar', () => setIsCalendarModalOpen(true))}
            >
              <i className="fa-regular fa-calendar-check" style={{ color: '#4285f4' }} /> {t.calendarSyncBtn}
            </button>

            {/* 5 Theme Colors Quick Dots & Modal Launcher */}
            <div className="theme-dots-cluster" title={t.themeModalTitle}>
              {APP_THEMES.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  className={`theme-dot-btn ${currentTheme === th.id ? 'active' : ''}`}
                  style={{ background: th.previewColor }}
                  title={`${lang === 'ms' ? th.nameMs : th.nameEn} (${th.icon})`}
                  onClick={() => {
                    setCurrentTheme(th.id);
                    showToast(`${lang === 'ms' ? 'Tema ditukar' : 'Theme switched'}: ${lang === 'ms' ? th.nameMs : th.nameEn}`);
                  }}
                />
              ))}
              <button
                type="button"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center' }}
                title={t.themeModalTitle}
                onClick={() => openModal('theme', () => setIsThemeModalOpen(true))}
              >
                <i className="fa-solid fa-palette" style={{ color: 'var(--accent-color)' }} />
              </button>
            </div>

            {/* Language Switcher Toggle */}
            <button
              type="button"
              className="action-btn-header"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent-color)', fontWeight: 800 }}
              title="Switch Language (English / Bahasa Melayu)"
              onClick={toggleLanguage}
            >
              <i className="fa-solid fa-globe" /> {t.languageBtn}
            </button>

            {/* Archive Drawer Button */}
            <button
              type="button"
              className="action-btn-header"
              title="Open Archive"
              onClick={() => openModal('archive', () => setIsArchiveOpen(true))}
            >
              <i className="fa-solid fa-box-archive" style={{ color: 'var(--accent-color)' }} /> {t.archiveBtn} ({entries.length})
            </button>
          </div>
        </header>

        {/* MAIN WORKSPACE GRID */}
        <main className="journal-grid">
          {/* LEFT COLUMN: QUOTE & CALENDAR */}
          <aside className="panel left-column">
            <div className="quote-box">
              <p>"{currentQuote}"</p>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: 700, display: 'block', textAlign: 'right', marginTop: '4px' }}>
                Day {todayDayOfMonth} • {t.dayQuoteTitle}
              </span>
            </div>

            <div className="calendar-container">
              <div className="calendar-header">
                <button
                  type="button"
                  className="cal-btn"
                  title="Previous Month"
                  onClick={() => setCalendarCursor(new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1))}
                >
                  <i className="fa-solid fa-chevron-left" />
                </button>
                <span>{t.calMonthNames[calendarCursor.getMonth()]} {calendarCursor.getFullYear()}</span>
                <button
                  type="button"
                  className="cal-btn"
                  title="Next Month"
                  onClick={() => setCalendarCursor(new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1))}
                >
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>

              <div className="calendar-weekdays">
                {t.calWeekdays.map((w, idx) => (
                  <span key={idx}>{w}</span>
                ))}
              </div>

              <div className="calendar-grid">
                {calendarDays.map((cell) => {
                  if (cell.empty) return <div key={cell.key} className="cal-day" />;
                  return (
                    <div
                      key={cell.key}
                      className={`cal-day ${cell.isToday ? 'today' : ''} ${cell.hasEntry ? 'has-entry' : ''} ${cell.isActive ? 'active-filter' : ''}`}
                      onClick={() => {
                        setFilteredDate(cell.dateStr);
                        const [y, m, d] = cell.dateStr.split('-').map(Number);
                        const targetDate = new Date(y, m - 1, d, new Date().getHours(), new Date().getMinutes());
                        setFormTimeToDate(targetDate);
                        showToast(`${lang === 'ms' ? 'Menapis tarikh' : 'Selected date'}: ${cell.dateStr}`);
                      }}
                    >
                      {cell.dayNumber}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>
                  <i className="fa-solid fa-circle" style={{ color: 'var(--accent-color)', fontSize: '0.45rem' }} /> {t.hasEntry}
                </span>
                {filteredDate && (
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                    onClick={() => {
                      setFilteredDate(null);
                      setFormTimeToDate(new Date());
                      showToast(lang === 'ms' ? 'Penapis dibersihkan' : 'Filter cleared');
                    }}
                  >
                    {t.viewAll}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: JOURNAL ENTRY FORM */}
          <section className="panel right-column">
            <div className="panel-header">
              <span className="panel-title">
                <i className="fa-solid fa-pen-nib" /> {t.editorTitle}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {formDateTime ? new Date(formDateTime).toLocaleDateString(lang === 'ms' ? 'ms-MY' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
              </span>
            </div>

            <form onSubmit={handleSubmitEntry} className="editor-form">
              {/* Date & Time Picker */}
              <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.65rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <label htmlFor="customEntryDate" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <i className="fa-regular fa-calendar-plus" style={{ color: 'var(--accent-color)' }} /> {t.dateTimeLabel}
                  </label>
                  <button
                    type="button"
                    className="media-pill-btn"
                    style={{ minHeight: '28px', padding: '0.15rem 0.5rem', fontSize: '0.7rem', borderRadius: 'var(--radius-pill)' }}
                    onClick={() => {
                      setFormTimeToDate(new Date());
                      showToast(lang === 'ms' ? 'Waktu diselaraskan ke saat ini.' : 'Time set to right now.');
                    }}
                  >
                    <i className="fa-solid fa-rotate-left" /> {t.currentTimeBtn}
                  </button>
                </div>
                <input
                  type="datetime-local"
                  id="customEntryDate"
                  className="input-field"
                  value={formDateTime}
                  onChange={(e) => setFormDateTime(e.target.value)}
                  style={{ padding: '0.4rem 0.65rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
                />
              </div>

              {/* Title Input */}
              <input
                type="text"
                className="input-field"
                placeholder={t.titlePlaceholder}
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                required
                maxLength={120}
                style={{ fontSize: '1rem', fontWeight: 700 }}
              />

              {/* Mood & Category */}
              <div className="meta-row">
                <select className="input-field" value={entryMood} onChange={(e) => setEntryMood(e.target.value)}>
                  {t.moods.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>

                <select className="input-field" value={entryCategory} onChange={(e) => setEntryCategory(e.target.value)}>
                  {t.categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Content Textarea */}
              <textarea
                className="input-field"
                style={{ minHeight: '150px', lineHeight: 1.6 }}
                placeholder={t.contentPlaceholder}
                value={entryContent}
                onChange={(e) => setEntryContent(e.target.value)}
                required
              />

              {/* PHOTO CAMERA (MAX 10) */}
              <div className="media-card">
                <div className="media-header">
                  <span>
                    <i className="fa-regular fa-image" style={{ color: 'var(--accent-color)' }} /> {t.photoHeader} ({attachedPhotos.length}/10)
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <label className="media-pill-btn" style={{ cursor: 'pointer' }}>
                      <i className="fa-solid fa-upload" /> {t.galleryBtn}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={(e) => handlePhotoFiles(e.target.files)}
                      />
                    </label>

                    <button
                      type="button"
                      className="media-pill-btn"
                      style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)', fontWeight: 700 }}
                      onClick={() => startCamera('photo')}
                    >
                      <i className="fa-solid fa-camera" /> {t.photoCameraBtn}
                    </button>
                  </div>
                </div>

                {attachedPhotos.length > 0 && (
                  <div className="photo-dropdown-container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="cal-btn"
                        onClick={() => setPhotoCursor((prev) => (prev - 1 + attachedPhotos.length) % attachedPhotos.length)}
                      >
                        <i className="fa-solid fa-chevron-left" />
                      </button>
                      <select
                        className="input-field"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', flex: 1 }}
                        value={photoCursor}
                        onChange={(e) => setPhotoCursor(parseInt(e.target.value, 10))}
                      >
                        {attachedPhotos.map((_, idx) => (
                          <option key={idx} value={idx}>
                            Photo {idx + 1} / {attachedPhotos.length}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="cal-btn"
                        onClick={() => setPhotoCursor((prev) => (prev + 1) % attachedPhotos.length)}
                      >
                        <i className="fa-solid fa-chevron-right" />
                      </button>
                      <button
                        type="button"
                        className="cal-btn"
                        style={{ color: '#ef4444' }}
                        onClick={() => {
                          const updated = attachedPhotos.filter((_, idx) => idx !== photoCursor);
                          setAttachedPhotos(updated);
                          setPhotoCursor(Math.max(0, updated.length - 1));
                          showToast(lang === 'ms' ? 'Foto dipadam.' : 'Photo deleted.');
                        }}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>

                    <div className="image-preview-stage">
                      <img src={attachedPhotos[photoCursor]} alt="Preview" />
                    </div>
                  </div>
                )}
              </div>

              {/* VOICE RECORDER (1 SLOT ONLY) */}
              {isAudioRecording ? (
                /* LIVE RECORDING VIEW */
                <div className="media-card" style={{ borderColor: '#8b5cf6', background: 'var(--bg-panel)', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.18)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="recording-pulsing-dot" />
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#8b5cf6' }}>
                        {isAudioPaused ? (lang === 'ms' ? 'Jeda' : 'Paused') : t.recordingVoiceText}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.12)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-pill)' }}>
                      {formatAudioSeconds(audioRecSeconds)} / 05:00
                    </span>
                  </div>

                  {/* Realtime Equalizer Frequency Visualizer Bars */}
                  <div className="audio-visualizer-strip">
                    {audioVisualizerLevels.map((lvl, idx) => (
                      <div
                        key={idx}
                        className="audio-visualizer-bar"
                        style={{
                          height: isAudioPaused ? '14%' : `${lvl}%`,
                          opacity: isAudioPaused ? 0.35 : 0.85 + (lvl / 100) * 0.15,
                        }}
                      />
                    ))}
                  </div>

                  {/* Recording Action Controls */}
                  <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="media-pill-btn"
                      style={{ color: '#ef4444', borderColor: 'var(--border-color)' }}
                      onClick={cancelAudioRecording}
                    >
                      <i className="fa-solid fa-xmark" /> {t.discardRecordBtn}
                    </button>

                    <button
                      type="button"
                      className="media-pill-btn"
                      onClick={pauseResumeAudioRecording}
                    >
                      <i className={isAudioPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause'} /> {isAudioPaused ? t.resumeRecordBtn : t.pauseRecordBtn}
                    </button>

                    <button
                      type="button"
                      className="media-pill-btn"
                      style={{ background: '#8b5cf6', borderColor: '#8b5cf6', color: '#ffffff', fontWeight: 700 }}
                      onClick={stopAudioRecording}
                    >
                      <i className="fa-solid fa-check" /> {t.stopRecordBtn}
                    </button>
                  </div>
                </div>
              ) : attachedAudioUrl ? (
                /* AUDIO ATTACHED PREVIEW & PLAYER */
                <div className="media-card" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="media-header">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <i className="fa-solid fa-microphone-lines" style={{ color: '#8b5cf6' }} /> {t.voiceNoteHeader} (Slot: 1/1)
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="media-pill-btn"
                        style={{ fontSize: '0.72rem' }}
                        onClick={startAudioRecording}
                      >
                        <i className="fa-solid fa-rotate-left" /> {t.reRecordBtn}
                      </button>
                      <button
                        type="button"
                        className="cal-btn"
                        style={{ color: '#ef4444' }}
                        onClick={removeAttachedAudio}
                        title={t.voiceNoteDeleted}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>

                  <div className="voice-note-player-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>
                        <i className="fa-solid fa-headphones" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lang === 'ms' ? 'Nota Suara Catatan' : 'Journal Voice Note'}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {attachedAudioDuration > 0 ? `${formatAudioSeconds(attachedAudioDuration)} • ${lang === 'ms' ? 'Sedia disimpan' : 'Ready to save'}` : (lang === 'ms' ? 'Audio sedia disimpan' : 'Audio ready to save')}
                        </div>
                      </div>
                    </div>
                    <audio
                      ref={editorAudioPlayerRef}
                      src={attachedAudioUrl}
                      controls
                      preload="metadata"
                      style={{ width: '100%', height: '34px', outline: 'none' }}
                    />
                  </div>
                </div>
              ) : (
                /* INITIAL RECORDER LAUNCHER */
                <div className="media-card">
                  <div className="media-header">
                    <span>
                      <i className="fa-solid fa-microphone-lines" style={{ color: '#8b5cf6' }} /> {t.voiceNoteHeader} (Slot: 0/1)
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <label className="media-pill-btn" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-file-audio" /> {t.audioFileBtn}
                        <input
                          type="file"
                          accept="audio/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleAudioFile(e.target.files?.[0] || null)}
                        />
                      </label>

                      <button
                        type="button"
                        className="media-pill-btn"
                        style={{ borderColor: '#8b5cf6', color: '#8b5cf6', fontWeight: 700 }}
                        onClick={startAudioRecording}
                      >
                        <i className="fa-solid fa-microphone" /> {t.recordVoiceBtn}
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.15rem 0.1rem' }}>
                    <i className="fa-solid fa-circle-info" style={{ color: '#8b5cf6' }} />
                    <span>{lang === 'ms' ? 'Rakam suara langsung guna mikrofon telefon/komputer untuk disimpan bersama catatan.' : 'Record live voice notes with microphone to save alongside your journal entry.'}</span>
                  </div>
                </div>
              )}

              {/* VIDEO CAMERA (1 SLOT ONLY) */}
              <div className="media-card">
                <div className="media-header">
                  <span>
                    <i className="fa-solid fa-video" style={{ color: '#3b82f6' }} /> {t.videoHeader} (Slot: {attachedVideoUrl ? '1/1' : '0/1'})
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <label className="media-pill-btn" style={{ cursor: attachedVideoUrl ? 'not-allowed' : 'pointer', opacity: attachedVideoUrl ? 0.5 : 1 }}>
                      <i className="fa-solid fa-file-video" /> {t.videoFileBtn}
                      <input
                        type="file"
                        accept="video/*"
                        disabled={!!attachedVideoUrl}
                        style={{ display: 'none' }}
                        onChange={(e) => handleVideoFile(e.target.files?.[0] || null)}
                      />
                    </label>

                    <button
                      type="button"
                      className="media-pill-btn"
                      disabled={!!attachedVideoUrl}
                      style={{ borderColor: '#ef4444', color: '#ef4444', fontWeight: 700, opacity: attachedVideoUrl ? 0.5 : 1 }}
                      onClick={() => startCamera('video')}
                    >
                      <i className="fa-solid fa-video" /> {t.videoCameraBtn}
                    </button>
                  </div>
                </div>

                {attachedVideoUrl && (
                  <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', position: 'relative' }}>
                    <video ref={videoPlayerRef} src={attachedVideoUrl} controls playsInline style={{ width: '100%', height: 'auto', maxHeight: '260px', display: 'block' }} />
                    <button
                      type="button"
                      className="cal-btn"
                      style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: '#ef4444', border: 'none' }}
                      title="Remove Video"
                      onClick={() => {
                        setAttachedVideoUrl(null);
                        setAttachedVideoBlob(null);
                        showToast(lang === 'ms' ? 'Video dipadam.' : 'Video removed.');
                      }}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons Row */}
              <div className="form-submit-row">
                <button type="submit" className="btn-submit-primary">
                  <i className="fa-solid fa-floppy-disk" /> {t.saveEntryBtn}
                </button>
                <button type="button" className="btn-submit-gcal" onClick={handleGoogleCalendarWeb}>
                  <i className="fa-brands fa-google" /> {t.saveGcalBtn}
                </button>
              </div>
            </form>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="app-footer">
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.footerCredit}</p>
        </footer>
      </div>

      {/* FLOATING ARCHIVE BUTTON */}
      <button type="button" className="floating-archive-btn" onClick={() => openModal('archive', () => setIsArchiveOpen(true))}>
        <i className="fa-solid fa-face-laugh-beam" /> {t.archiveBtn} ({entries.length})
      </button>

      {/* DROPSIDE ARCHIVE DRAWER */}
      <div className={`archive-backdrop ${isArchiveOpen ? 'open' : ''}`} onClick={() => setIsArchiveOpen(false)} />
      <aside className={`archive-dropside ${isArchiveOpen ? 'open' : ''}`}>
        <canvas ref={archiveDustCanvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }} />

        {/* Joyful Animated Stage */}
        <div className="joy-banner-stage">
          <div className="joy-confetti-layer">
            <span className="confetti-piece confetti-1" />
            <span className="confetti-piece confetti-2" />
            <span className="confetti-piece confetti-3" />
            <span className="confetti-piece confetti-4" />
            <span className="confetti-piece confetti-5" />
            <span className="confetti-piece confetti-6" />
          </div>
          <span className="joy-balloon balloon-left" title="Yay!">🎈</span>
          <span className="joy-balloon balloon-right" title="Fun!">🎉</span>
          <div className="joy-bouncing-mascot" title="Happy Go Lucky!">😄</div>
          <div className="joy-title-pill">
            <i className="fa-solid fa-face-laugh-beam" style={{ color: '#fffb00' }} /> {t.archiveTitle}
          </div>
        </div>

        {/* Archive Tabs */}
        <div className="archive-tabs-strip" style={{ position: 'relative', zIndex: 1001 }}>
          <button
            type="button"
            className={`archive-tab-btn ${archiveTab === 'entries' ? 'active' : ''}`}
            onClick={() => setArchiveTab('entries')}
          >
            <i className="fa-solid fa-book-open" /> {t.tabEntries} ({entries.length})
          </button>
          <button
            type="button"
            className={`archive-tab-btn ${archiveTab === 'templates' ? 'active' : ''}`}
            onClick={() => setArchiveTab('templates')}
          >
            <i className="fa-solid fa-file-pdf" /> {t.tabTemplates}
          </button>
        </div>

        {/* Tab 1: Entries List */}
        {archiveTab === 'entries' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1001 }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button type="button" className="cal-btn" onClick={() => setIsArchiveOpen(false)}>
                  <i className="fa-solid fa-arrow-left" />
                </button>
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{t.tabEntries}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <i className="fa-solid fa-arrows-left-right" /> {t.swipeHint}
              </span>
            </div>

            <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
              <input
                type="text"
                className="input-field"
                placeholder={t.searchPlaceholder}
                style={{ fontSize: '0.8rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredArchiveEntries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {t.noEntries}
                </div>
              ) : (
                filteredArchiveEntries.map((e) => {
                  const d = new Date(e.timestamp);
                  const videoUrl = loadedVideosMap[e.id] || e.video || null;

                  return (
                    <div key={e.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <b style={{ fontSize: '0.9rem' }}>{e.title}</b>
                        <span style={{ fontSize: '0.75rem' }}>{e.mood}</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {d.toLocaleDateString(lang === 'ms' ? 'ms-MY' : 'en-US')} • {d.toLocaleTimeString(lang === 'ms' ? 'ms-MY' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{e.content}</p>

                      {/* Attached Video */}
                      {videoUrl && (
                        <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000', marginTop: '0.35rem' }}>
                          <video src={videoUrl} controls playsInline preload="metadata" style={{ width: '100%', maxHeight: '200px', display: 'block', objectFit: 'contain' }} />
                        </div>
                      )}

                      {/* Attached Photos */}
                      {e.photos && e.photos.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                          {e.photos.map((p, pIdx) => (
                            <img key={pIdx} src={p} alt="thumb" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                          ))}
                        </div>
                      )}

                      {/* Attached Voice Note */}
                      {(loadedAudiosMap[e.id] || e.audioVoiceNote) && (
                        <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.45rem 0.65rem', marginTop: '0.35rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <i className="fa-solid fa-microphone-lines" style={{ color: '#8b5cf6', fontSize: '0.8rem' }} />
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                {lang === 'ms' ? 'Nota Suara' : 'Voice Note'}
                              </span>
                            </div>
                            {e.audioDuration ? (
                              <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                {formatAudioSeconds(e.audioDuration)}
                              </span>
                            ) : null}
                          </div>
                          <audio
                            src={loadedAudiosMap[e.id] || e.audioVoiceNote || ''}
                            controls
                            preload="metadata"
                            style={{ width: '100%', height: '32px', display: 'block' }}
                          />
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem' }}>
                        <span style={{ fontSize: '0.68rem', background: 'var(--accent-soft)', color: 'var(--accent-color)', padding: '0.15rem 0.4rem', borderRadius: '999px' }}>
                          #{e.category}
                        </span>
                        <button type="button" className="cal-btn" style={{ color: '#ef4444' }} onClick={() => handleDeleteEntry(e.id)}>
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 2: 10 PDF Templates & Export Studio */}
        {archiveTab === 'templates' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', padding: '1rem', gap: '0.85rem' }}>
            <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <i className="fa-solid fa-mountain-sun" /> {t.templatesHeader}
              </span>
              <div className="template-grid-choice" style={{ marginTop: '0.65rem' }}>
                {Object.entries(TEMPLATE_METADATA).map(([key, tpl]) => (
                  <div
                    key={key}
                    className={`template-card-choice ${selectedTemplateId === key ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTemplateId(key);
                      showToast(`Template: ${tpl.name}`);
                    }}
                  >
                    <img className="template-thumb-preview" src={tpl.bgUrl} alt={tpl.name} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>{tpl.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* A4 Orientation Selection */}
            <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{t.pageSizeHeader}</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{
                    justifyContent: 'center',
                    minHeight: '44px',
                    borderColor: docOrientation === 'portrait' ? '#b45309' : 'var(--border-color)',
                    background: docOrientation === 'portrait' ? '#fffbeb' : 'var(--bg-panel)',
                    color: docOrientation === 'portrait' ? '#78350f' : 'inherit',
                    fontWeight: docOrientation === 'portrait' ? 800 : 600,
                  }}
                  onClick={() => setDocOrientation('portrait')}
                >
                  {t.portrait}
                </button>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{
                    justifyContent: 'center',
                    minHeight: '44px',
                    borderColor: docOrientation === 'landscape' ? '#b45309' : 'var(--border-color)',
                    background: docOrientation === 'landscape' ? '#fffbeb' : 'var(--bg-panel)',
                    color: docOrientation === 'landscape' ? '#78350f' : 'inherit',
                    fontWeight: docOrientation === 'landscape' ? 800 : 600,
                  }}
                  onClick={() => setDocOrientation('landscape')}
                >
                  {t.landscape}
                </button>
              </div>
            </div>

            {/* Period Selector */}
            <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309' }}>
                <i className="fa-solid fa-calendar-week" /> {t.periodHeader}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.35rem' }}>
                {(['1day', '7days', '30days'] as const).map((period) => (
                  <button
                    key={period}
                    type="button"
                    className="media-pill-btn"
                    style={{
                      justifyContent: 'center',
                      padding: '0.4rem 0.2rem',
                      fontSize: '0.72rem',
                      minHeight: '40px',
                      borderColor: exportPeriod === period ? '#b45309' : 'var(--border-color)',
                      background: exportPeriod === period ? '#fffbeb' : 'var(--bg-panel)',
                      color: exportPeriod === period ? '#78350f' : 'inherit',
                      fontWeight: exportPeriod === period ? 800 : 600,
                    }}
                    onClick={() => setExportPeriod(period)}
                  >
                    {period === '1day' ? t.period1 : period === '7days' ? t.period7 : t.period30}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn-submit-primary"
              style={{ background: '#b45309', minHeight: '44px' }}
              onClick={() => openModal('studio', () => setIsStudioOpen(true))}
            >
              <i className="fa-solid fa-sliders" /> {t.livePreviewBtn}
            </button>
          </div>
        )}
      </aside>

      {/* REAL A4 PREVIEW STUDIO MODAL */}
      {isStudioOpen && (
        <div className="doc-preview-modal-backdrop">
          <div className="doc-preview-box">
            <div className="doc-preview-header">
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <i className="fa-solid fa-sliders" style={{ color: '#b45309' }} />
                <span>
                  {t.studioTitle} • {docOrientation === 'landscape' ? t.landscape : t.portrait}
                </span>
              </div>
              <button type="button" className="cal-btn" onClick={() => setIsStudioOpen(false)}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            {/* 24 Palette Colors */}
            <div className="palette-toolbar-container">
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#78350f' }}>{t.textColorTitle}</span>
              <div className="palette-swatches-grid">
                {PALETTE_COLORS.map((c) => (
                  <div
                    key={c.hex}
                    className={`text-color-swatch ${activeTextColor.toLowerCase() === c.hex.toLowerCase() ? 'active' : ''}`}
                    style={{ background: c.hex }}
                    title={c.name}
                    onClick={() => {
                      setActiveTextColor(c.hex);
                      showToast(`Text Color: ${c.name}`);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sliders Bar */}
            <div className="font-adjuster-bar">
              <div className="font-adjuster-group">
                <div className="adjuster-item">
                  <span>{t.headingLabel}</span>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={fontSizes.heading}
                    onChange={(e) => setFontSizes((prev) => ({ ...prev, heading: parseFloat(e.target.value) }))}
                    style={{ width: '55px', accentColor: '#b45309' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#b45309', minWidth: '24px' }}>{fontSizes.heading}pt</span>
                </div>

                <div className="adjuster-item">
                  <span>{t.bodyAndMetaLabel}</span>
                  <input
                    type="range"
                    min="6"
                    max="30"
                    step="0.5"
                    value={fontSizes.body}
                    onChange={(e) => setFontSizes((prev) => ({ ...prev, body: parseFloat(e.target.value) }))}
                    style={{ width: '55px', accentColor: '#b45309' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#b45309', minWidth: '38px', fontWeight: 800 }}>
                    {fontSizes.body}pt ({Math.max(7.5, Math.round(fontSizes.body * 0.78 * 10) / 10)}pt)
                  </span>
                </div>

                <div className="adjuster-item">
                  <span>{t.quoteLabel}</span>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={fontSizes.quote}
                    onChange={(e) => setFontSizes((prev) => ({ ...prev, quote: parseFloat(e.target.value) }))}
                    style={{ width: '55px', accentColor: '#b45309' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#b45309', minWidth: '24px' }}>{fontSizes.quote}pt</span>
                </div>

                <div className="adjuster-item" style={{ background: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <i className="fa-solid fa-square" style={{ color: '#cbd5e1', fontSize: '0.7rem' }} />
                  <span>{t.boxOpacityLabel}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={Math.round(boxOpacity * 100)}
                    onChange={(e) => setBoxOpacity(parseFloat(e.target.value) / 100)}
                    style={{ width: '55px', accentColor: '#b45309' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#b45309', minWidth: '26px' }}>{Math.round(boxOpacity * 100)}%</span>
                </div>
              </div>

              <button
                type="button"
                className="media-pill-btn"
                style={{ background: '#10b981', color: '#fff', border: 'none', minHeight: '32px', padding: '0.25rem 0.65rem', fontSize: '0.74rem' }}
                onClick={() => {
                  try {
                    localStorage.setItem('mydiary_text_color', activeTextColor);
                    localStorage.setItem('mydiary_block_positions', JSON.stringify(blockPositions));
                    localStorage.setItem('mydiary_font_sizes', JSON.stringify(fontSizes));
                    localStorage.setItem('mydiary_box_opacity', boxOpacity.toString());
                    showToast(lang === 'ms' ? 'Tetapan rekaan berjaya disimpan!' : 'Design settings saved!');
                  } catch {}
                }}
              >
                <i className="fa-solid fa-floppy-disk" /> {t.saveLayoutBtn}
              </button>
            </div>

            {/* Viewport scaling controls & Box Nudge controller */}
            <div style={{ background: '#fffbeb', borderBottom: '1px solid #fed7aa', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.45rem', fontSize: '0.75rem', flexShrink: 0 }}>
              {/* Zoom Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontWeight: 800, color: '#9a3412', fontSize: '0.72rem' }}>Zoom:</span>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{
                    minHeight: '28px',
                    padding: '0.15rem 0.55rem',
                    fontSize: '0.7rem',
                    background: zoomMode === 'fit' ? '#b45309' : '#fff',
                    color: zoomMode === 'fit' ? '#fff' : '#9a3412',
                    borderColor: '#b45309',
                    fontWeight: 700,
                  }}
                  onClick={() => {
                    setZoomMode('fit');
                    autoScaleA4();
                    showToast(lang === 'ms' ? 'Paparan disesuaikan mengikut saiz skrin telefon' : 'Scaled to fit phone screen');
                  }}
                >
                  {t.zoomFit} ({Math.round(fitScale * 100)}%)
                </button>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{ minHeight: '28px', padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}
                  onClick={() => setZoomMode((prev) => Math.max(0.15, (prev === 'fit' ? fitScale : prev) - 0.1))}
                  title={t.zoomOut}
                >
                  <i className="fa-solid fa-magnifying-glass-minus" />
                </button>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{ minHeight: '28px', padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}
                  onClick={() => setZoomMode((prev) => Math.min(2.0, (prev === 'fit' ? fitScale : prev) + 0.1))}
                  title={t.zoomIn}
                >
                  <i className="fa-solid fa-magnifying-glass-plus" />
                </button>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{
                    minHeight: '28px',
                    padding: '0.15rem 0.45rem',
                    fontSize: '0.7rem',
                    background: zoomMode === 1 ? '#b45309' : '#fff',
                    color: zoomMode === 1 ? '#fff' : 'inherit',
                  }}
                  onClick={() => setZoomMode(1)}
                  title={t.zoom100}
                >
                  100%
                </button>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#9a3412', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <i className="fa-solid fa-hand-pointer" />
                <span>{lang === 'ms' ? 'Sentuh & seret mana-mana kotak terus guna jari' : 'Touch & drag any box with your finger'}</span>
              </div>
            </div>

            {/* A4 Viewport with dynamic phone scaling */}
            <div ref={viewportRef} className="doc-preview-viewport">
              <div
                className={`a4-scalable-stage ${docOrientation === 'landscape' ? 'is-landscape' : ''}`}
                style={{
                  transform: `scale(${zoomMode === 'fit' ? fitScale : zoomMode})`,
                  transformOrigin: 'center center',
                }}
              >
                <iframe ref={iframeRef} title="A4 Document Preview" />
              </div>
            </div>

            {/* Footer */}
            <div className="doc-preview-footer">
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.pinchTip}</div>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="media-pill-btn"
                  onClick={() => {
                    setBlockPositions({ header: { x: 0, y: 0 }, entries: { x: 0, y: 0 }, quote: { x: 0, y: 0 } });
                    setFontSizes({ heading: 16, body: 9, quote: 16 });
                    setBoxOpacity(0.65);
                    showToast(lang === 'ms' ? 'Kedudukan & saiz direset.' : 'Layout positions reset.');
                  }}
                >
                  <i className="fa-solid fa-rotate-left" /> {t.resetPositionsBtn}
                </button>
                <button
                  type="button"
                  className="btn-submit-primary"
                  style={{ minHeight: '40px', padding: '0.45rem 0.95rem', background: '#b45309' }}
                  onClick={handlePrintPdf}
                >
                  <i className="fa-solid fa-print" /> {t.printPdfBtn}
                </button>
                <button
                  type="button"
                  className="btn-submit-primary"
                  style={{ minHeight: '40px', padding: '0.45rem 0.95rem', background: '#4f46e5' }}
                  onClick={handleDownloadEbook}
                >
                  <i className="fa-solid fa-file-code" /> {t.downloadEbookBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CAMERA MODAL */}
      {isCameraModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box" style={{ maxWidth: '380px' }}>
            <button type="button" className="modal-close-btn" onClick={stopCamera}>×</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                {cameraMode === 'photo' ? t.cameraPhotoHeading : t.cameraVideoHeading}
              </h3>
              {isRecording && (
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '999px' }}>
                  <i className="fa-solid fa-circle" /> {t.recordingText} 00:{String(recTimer).padStart(2, '0')}
                </span>
              )}
            </div>

            <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: '290px', background: '#000', borderRadius: 'var(--radius-md)', overflow: 'hidden', margin: '0.5rem auto', position: 'relative', border: '2px solid var(--border-color)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)' }}>
              <video ref={cameraVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', marginTop: '0.65rem' }}>
              <button type="button" className="cal-btn" title={t.flipCameraTitle} style={{ width: '40px', height: '40px' }} onClick={toggleCameraFacing}>
                <i className="fa-solid fa-arrows-rotate" />
              </button>

              <button
                type="button"
                className="cal-btn"
                style={{
                  background: cameraMode === 'photo' ? '#fd6c9e' : isRecording ? '#991b1b' : '#ef4444',
                  color: '#fff',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  fontSize: '1.3rem',
                  boxShadow: '0 4px 10px rgba(253,108,158,0.4)',
                }}
                onClick={() => {
                  if (cameraMode === 'photo') capturePhotoSnapshot();
                  else toggleVideoRecording();
                }}
              >
                <i className={`fa-solid ${cameraMode === 'photo' ? 'fa-camera' : isRecording ? 'fa-stop' : 'fa-video'}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW FEATURE MODAL 1: DAILY REMINDER NOTIFICATIONS */}
      {isReminderModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <button type="button" className="modal-close-btn" onClick={() => setIsReminderModalOpen(false)}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <i className="fa-solid fa-bell" style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.reminderModalTitle}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Permission Banner */}
              <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                    {notificationPermission === 'granted' ? (
                      <span style={{ color: '#10b981' }}><i className="fa-solid fa-circle-check" /> {t.permissionGranted}</span>
                    ) : notificationPermission === 'denied' ? (
                      <span style={{ color: '#ef4444' }}><i className="fa-solid fa-circle-xmark" /> {t.permissionDenied}</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}><i className="fa-regular fa-bell" /> Browser Notifications</span>
                    )}
                  </div>
                </div>
                {notificationPermission !== 'granted' && (
                  <button type="button" className="media-pill-btn" onClick={requestNotificationPermission} style={{ fontSize: '0.72rem', background: 'var(--accent-color)', color: '#fff', border: 'none' }}>
                    {t.enablePermissionBtn}
                  </button>
                )}
              </div>

              {/* Toggle Active */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={reminderEnabled}
                  onChange={(e) => setReminderEnabled(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-color)' }}
                />
                <span>{lang === 'ms' ? 'Aktifkan Peringatan Harian' : 'Enable Daily Reminder Notification'}</span>
              </label>

              {/* Time Picker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {t.reminderTimeLabel}
                </label>
                <input
                  type="time"
                  className="input-field"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700 }}
                />
              </div>

              {/* Frequency */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {t.reminderFreqLabel}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.35rem' }}>
                  {(['all', 'weekdays', 'weekends'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      className="media-pill-btn"
                      style={{
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        padding: '0.4rem 0.2rem',
                        borderColor: reminderFrequency === freq ? 'var(--accent-color)' : 'var(--border-color)',
                        background: reminderFrequency === freq ? 'var(--accent-soft)' : 'var(--bg-canvas)',
                        color: reminderFrequency === freq ? 'var(--accent-color)' : 'inherit',
                        fontWeight: reminderFrequency === freq ? 800 : 600,
                      }}
                      onClick={() => setReminderFrequency(freq)}
                    >
                      {freq === 'all' ? t.reminderFreqAll : freq === 'weekdays' ? t.reminderFreqWeekdays : t.reminderFreqWeekends}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Chime */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={reminderChime}
                  onChange={(e) => setReminderChime(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--accent-color)' }}
                />
                <span><i className="fa-solid fa-volume-high" style={{ color: 'var(--accent-color)' }} /> {t.reminderSoundLabel}</span>
              </label>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="media-pill-btn"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={testDailyNotificationNow}
                >
                  <i className="fa-solid fa-play" /> {t.testNotificationBtn}
                </button>
                <button
                  type="button"
                  className="btn-submit-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    localStorage.setItem('mydiary_reminder_time', reminderTime);
                    localStorage.setItem('mydiary_reminder_freq', reminderFrequency);
                    localStorage.setItem('mydiary_reminder_enabled', reminderEnabled.toString());
                    localStorage.setItem('mydiary_reminder_chime', reminderChime.toString());
                    showToast(lang === 'ms' ? 'Tetapan peringatan disimpan!' : 'Reminder preferences saved!');
                    setIsReminderModalOpen(false);
                  }}
                >
                  <i className="fa-solid fa-check" /> {t.saveReminderBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW FEATURE MODAL 2: DEVICE CALENDAR SYNCHRONIZATION */}
      {isCalendarModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <button type="button" className="modal-close-btn" onClick={() => setIsCalendarModalOpen(false)}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <i className="fa-regular fa-calendar-check" style={{ color: '#4285f4', fontSize: '1.2rem' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.calendarSyncTitle}</h3>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              {lang === 'ms'
                ? 'Pilih pilihan kalendar di bawah untuk menyelaraskan MyDiary dengan Apple Calendar, Google Calendar, Samsung Calendar, atau Outlook pada peranti anda.'
                : 'Select a sync option below to connect MyDiary with Apple Calendar, Google Calendar, Samsung Calendar, or Outlook on your device.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Option 1: Daily Recurring Alarm */}
              <button
                type="button"
                className="media-card"
                style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', border: '1.5px solid var(--accent-color)' }}
                onClick={exportDailyReminderIcs}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                  <i className="fa-solid fa-bell" /> {t.syncDailyAlarmBtn}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.syncDailyAlarmDesc}</span>
              </button>

              {/* Option 2: Sync All Entries */}
              <button
                type="button"
                className="media-card"
                style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                onClick={exportAllEntriesIcs}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.85rem' }}>
                  <i className="fa-solid fa-calendar-days" style={{ color: '#10b981' }} /> {t.syncAllEntriesBtn}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.syncAllEntriesDesc}</span>
              </button>

              {/* Option 3: Sync Current Entry */}
              <button
                type="button"
                className="media-card"
                style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                onClick={exportCurrentEntryIcs}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.85rem' }}>
                  <i className="fa-solid fa-calendar-plus" style={{ color: '#f59e0b' }} /> {t.syncCurrentEntryBtn}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {lang === 'ms' ? 'Eksport catatan yang sedang ditulis di borang.' : 'Exports the note currently being composed in editor.'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5 THEME COLORS MODAL */}
      {isThemeModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsThemeModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fa-solid fa-palette" style={{ color: 'var(--accent-color)', fontSize: '1.25rem' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{t.themeModalTitle}</h3>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.themeSubtitle}</p>
                </div>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setIsThemeModalOpen(false)}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="theme-modal-grid">
              {APP_THEMES.map((th) => {
                const isActive = currentTheme === th.id;
                return (
                  <div
                    key={th.id}
                    className={`theme-card-option ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentTheme(th.id);
                      showToast(`${lang === 'ms' ? 'Tema' : 'Theme'}: ${lang === 'ms' ? th.nameMs : th.nameEn}`);
                    }}
                  >
                    <div className="theme-palette-preview">
                      {th.swatches.map((color, idx) => (
                        <span key={idx} style={{ background: color }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{th.icon}</span>
                        <span>{lang === 'ms' ? th.nameMs : th.nameEn}</span>
                      </span>
                      {isActive && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 800 }}>
                          <i className="fa-solid fa-circle-check" />
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                      {lang === 'ms' ? th.descMs : th.descEn}
                    </p>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-submit-primary"
                style={{ padding: '0.5rem 1.35rem', fontSize: '0.8rem', minHeight: '38px' }}
                onClick={() => setIsThemeModalOpen(false)}
              >
                {lang === 'ms' ? 'Selesai' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div id="toastNotification" className={toastVisible ? 'show' : ''}>
        {toastMessage}
      </div>
    </>
  );
}
