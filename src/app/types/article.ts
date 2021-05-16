export interface ICreateArticleInput {
  article_nme: string;
  article_content: string;
  group_id: string;
  only_me: boolean;
}
export interface IUpdateArticleInput {
  article_nme: string;
  article_content: string;
  group_id: string;
  only_me: boolean;
}
