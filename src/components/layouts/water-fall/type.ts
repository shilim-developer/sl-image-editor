export interface waterFallProps {
  columnNum?: number;
  gap?: number;
  dataList: any[];
  getList: () => Promise<any[]>;
}
