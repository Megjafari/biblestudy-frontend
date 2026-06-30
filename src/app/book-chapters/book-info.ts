export interface BookInfo {
  author: string;
  background: string;
  related: string[];
}

export const bookInfo: Record<string, BookInfo> = {
  // Old Testament
  GEN: {
    author: 'Traditionally Moses; most modern scholars see multiple authors',
    background:
      'The first book of the Pentateuch. Falls into two parts: the primeval history (chapters 1–11) covering creation, the fall, the flood and Babel, and the ancestral history (chapters 12–50) following Abraham, Isaac, Jacob and Joseph. Sets up the covenant promises that drive the rest of the Torah.',
    related: ['EXO', 'PSA', 'JHN', 'ROM', 'HEB'],
  },
  EXO: {
    author: 'Traditionally Moses; most modern scholars see multiple authors',
    background:
      'Continues directly from Genesis. The Israelites are enslaved in Egypt; God delivers them through Moses and the plagues, parts the Red Sea, and establishes the covenant and the Law at Mount Sinai, including instructions for the tabernacle.',
    related: ['GEN', 'LEV', 'NUM', 'DEU'],
  },
  LEV: {
    author: 'Traditionally Moses; most modern scholars see multiple authors',
    background:
      'Named for the Levites. Picks up at Sinai and lays out the laws and regulations for worship at the tabernacle: offerings, the priesthood, purity, feasts and holiness. Centred on how a holy God is approached and worshipped.',
    related: ['EXO', 'NUM', 'HEB'],
  },
  NUM: {
    author: 'Traditionally Moses; most modern scholars see multiple authors',
    background:
      'Follows Israel from Sinai through the wilderness toward Canaan. Named for the censuses it records. A story of repeated rebellion and unbelief, leading to a generation condemned to wander; only their children enter the promised land.',
    related: ['EXO', 'LEV', 'DEU'],
  },
  DEU: {
    author: 'Traditionally Moses; most modern scholars see multiple authors',
    background:
      "Moses' farewell addresses on the plains of Moab before Israel enters Canaan. Restates and expands the Law for the new generation, emphasising covenant faithfulness. Widely associated by scholars with the reforms of King Josiah in the 7th century BCE.",
    related: ['EXO', 'LEV', 'NUM', 'JOS'],
  },
  JOS: { author: '', background: '', related: [] },
  JDG: { author: '', background: '', related: [] },
  RUT: { author: '', background: '', related: [] },
  '1SA': { author: '', background: '', related: [] },
  '2SA': { author: '', background: '', related: [] },
  '1KI': { author: '', background: '', related: [] },
  '2KI': { author: '', background: '', related: [] },
  '1CH': { author: '', background: '', related: [] },
  '2CH': { author: '', background: '', related: [] },
  EZR: { author: '', background: '', related: [] },
  NEH: { author: '', background: '', related: [] },
  EST: { author: '', background: '', related: [] },
  JOB: { author: '', background: '', related: [] },
  PSA: { author: '', background: '', related: [] },
  PRO: { author: '', background: '', related: [] },
  ECC: { author: '', background: '', related: [] },
  SNG: { author: '', background: '', related: [] },
  ISA: { author: '', background: '', related: [] },
  JER: { author: '', background: '', related: [] },
  LAM: { author: '', background: '', related: [] },
  EZK: { author: '', background: '', related: [] },
  DAN: { author: '', background: '', related: [] },
  HOS: { author: '', background: '', related: [] },
  JOL: { author: '', background: '', related: [] },
  AMO: { author: '', background: '', related: [] },
  OBA: { author: '', background: '', related: [] },
  JON: { author: '', background: '', related: [] },
  MIC: { author: '', background: '', related: [] },
  NAM: { author: '', background: '', related: [] },
  HAB: { author: '', background: '', related: [] },
  ZEP: { author: '', background: '', related: [] },
  HAG: { author: '', background: '', related: [] },
  ZEC: { author: '', background: '', related: [] },
  MAL: { author: '', background: '', related: [] },

  // Apocrypha (your KJV includes these between Malachi and Matthew)
  '1ES': { author: '', background: '', related: [] },
  '2ES': { author: '', background: '', related: [] },
  TOB: { author: '', background: '', related: [] },
  JDT: { author: '', background: '', related: [] },
  ESG: { author: '', background: '', related: [] },
  WIS: { author: '', background: '', related: [] },
  SIR: { author: '', background: '', related: [] },
  BAR: { author: '', background: '', related: [] },
  S3Y: { author: '', background: '', related: [] },
  SUS: { author: '', background: '', related: [] },
  BEL: { author: '', background: '', related: [] },
  MAN: { author: '', background: '', related: [] },
  '1MA': { author: '', background: '', related: [] },
  '2MA': { author: '', background: '', related: [] },

  // New Testament
  MAT: { author: '', background: '', related: [] },
  MRK: { author: '', background: '', related: [] },
  LUK: { author: '', background: '', related: [] },
  JHN: { author: '', background: '', related: [] },
  ACT: { author: '', background: '', related: [] },
  ROM: { author: '', background: '', related: [] },
  '1CO': { author: '', background: '', related: [] },
  '2CO': { author: '', background: '', related: [] },
  GAL: { author: '', background: '', related: [] },
  EPH: { author: '', background: '', related: [] },
  PHP: { author: '', background: '', related: [] },
  COL: { author: '', background: '', related: [] },
  '1TH': { author: '', background: '', related: [] },
  '2TH': { author: '', background: '', related: [] },
  '1TI': { author: '', background: '', related: [] },
  '2TI': { author: '', background: '', related: [] },
  TIT: { author: '', background: '', related: [] },
  PHM: { author: '', background: '', related: [] },
  HEB: { author: '', background: '', related: [] },
  JAS: { author: '', background: '', related: [] },
  '1PE': { author: '', background: '', related: [] },
  '2PE': { author: '', background: '', related: [] },
  '1JN': { author: '', background: '', related: [] },
  '2JN': { author: '', background: '', related: [] },
  '3JN': { author: '', background: '', related: [] },
  JUD: { author: '', background: '', related: [] },
  REV: { author: '', background: '', related: [] },
};