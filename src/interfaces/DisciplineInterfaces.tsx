import {arrayDeleteOne} from '../helpers/ArrayStateManager';
export interface SimpleDiscipline {
  id: number;
  name: string;
}
export interface CompleteDiscipline {
  id: number;
  name: string;
  description: string;
  images: Image[];
}

export interface Image {
  url: string;
}

export type DisciplineSectionListData = {
  parent: DisciplineListItem;
  list: DisciplineListItem[];
}[];

export type DisciplineListResponse = DisciplineListItem[];

export interface DisciplineListItem {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  parents: {parentId: number}[];
}
