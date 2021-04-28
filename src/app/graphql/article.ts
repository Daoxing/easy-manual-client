import { gql } from 'apollo-angular';
export const CREATE_ARTICLE = gql`
  mutation createArticle($articleInfo: createArticleInput) {
    createArticle(articleInfo: $articleInfo) {
      success
      message
      result {
        article_id
        article_nme
        article_content
        only_me
      }
    }
  }
`;

export const QUERY_ARTICLE = gql`
  query getArticle($articleId: String!) {
    getArticle(articleId: $articleId) {
      success
      message
      result {
        article_id
        article_nme
        article_content
        only_me
        group {
          group_id
          group_nme
        }
      }
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($articleInfo: updateArticleInput) {
    updateArticle(articleInfo: $articleInfo) {
      success
      message
      result {
        article_id
        article_nme
      }
    }
  }
`;
