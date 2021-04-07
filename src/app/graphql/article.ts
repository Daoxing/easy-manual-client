import { gql } from 'apollo-angular';
export const CREATE_ARTICLE = gql`
  mutation createArticle($articleInfo: createArticleInput) {
    createArticle(articleInfo: $articleInfo) {
      success
      message
      result {
        article_id
        article_nme
      }
    }
  }
`;
