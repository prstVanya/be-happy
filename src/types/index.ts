export interface RootState {
  user: {
    info: {
      username?: string;
      telegramId?: string;
      avatar?: string;
    };
  };
}