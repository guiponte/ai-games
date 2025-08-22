
export enum ActivityType {
  Coloring = 'COLORING',
  Story = 'STORY',
  FunFact = 'FUN_FACT',
}

export interface Source {
  uri: string;
  title: string;
}
