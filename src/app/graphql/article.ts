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
  query getArticle($articleId: ID!) {
    getArticle(articleId: $articleId) {
      success
      message
      result {
        article_id
        article_nme
        article_content
        only_me
        created_tms
        updated_tms
        created_user {
          user_id
          user_nme
          icon_url
          display_nme
        }
        group {
          group_id
          group_nme
        }
        editable
        bookmarked
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

export const BOOKMARK_ARTICLE = gql`
  mutation bookmarkArticle($articleId: ID!) {
    bookmarkArticle(articleId: $articleId) {
      success
      message
      result {
        article_id
        article_nme
      }
    }
  }
`;

export const REMOVE_BOOKMARK_ARTICLE = gql`
  mutation removeArticleBookmark($articleId: ID!) {
    removeArticleBookmark(articleId: $articleId) {
      success
      message
      result {
        article_id
        article_nme
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleId: ID!) {
    deleteArticle(articleId: $articleId) {
      success
      message
      result {
        article_id
        article_nme
      }
    }
  }
`;

export const GET_ACCESSIBLE_ARTICLES = gql`
  query getUsersAccessibleArticles($sort: Order, $page: Pagination) {
    getUsersAccessibleArticles(sort: $sort, page: $page) {
      totalCount
      articles {
        article_nme
        created_user {
          user_id
          user_nme
          icon_url
          display_nme
        }
        created_tms
        article_id
      }
      page {
        pageNo
        pageCount
      }
    }
  }
`;

export const GET_MY_ALL_ARTICLES = gql`
  query getUsersAllArticles($sort: Order, $page: Pagination) {
    getUsersAllArticles(sort: $sort, page: $page) {
      totalCount
      articles {
        article_nme
        created_user {
          user_id
          user_nme
          icon_url
          display_nme
        }
        created_tms
        article_id
      }
      page {
        pageNo
        pageCount
      }
    }
  }
`;

export const GET_USER_ALL_PUBLIC_ARTICLES = gql`
  query getUsersAllPublicArticles($sort: Order, $page: Pagination) {
    getUsersAllPublicArticles(sort: $sort, page: $page) {
      totalCount
      articles {
        article_nme
        created_user {
          user_id
          user_nme
          icon_url
          display_nme
        }
        created_tms
        article_id
      }
      page {
        pageNo
        pageCount
      }
    }
  }
`;

export const GET_ARTICLES_IN_GROUP = gql`
  query getArticlesInGroup($group_id: ID!, $sort: Order, $page: Pagination) {
    getArticlesInGroup(group_id: $group_id, sort: $sort, page: $page) {
      totalCount
      articles {
        article_nme
        created_user {
          user_id
          user_nme
          display_nme
          icon_url
        }
        created_tms
        article_id
      }
      page {
        pageNo
        pageCount
      }
    }
  }
`;

export const BOOKMARKED_ARTICLES = gql`
  query bookmarkedArticles($sort: Order, $page: Pagination) {
    bookmarkedArticles(sort: $sort, page: $page) {
      totalCount
      articles {
        article_nme
        created_user {
          user_id
          user_nme
          display_nme
          icon_url
        }
        created_tms
        article_id
      }
      page {
        pageNo
        pageCount
      }
    }
  }
`;
