import { gql } from 'apollo-angular';
export const VERIFY_CODE = gql`
  mutation verifyCode($code: String!) {
    verifyCode(code: $code) {
      success
      message
      result {
        user_id
        user_nme
        email_address
        phone_nbr
        icon_url
        gender
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      user_id
      user_nme
      email_address
      phone_nbr
      icon_url
      gender
      my_groups {
        article_count
        group_id
        group_nme
        created_user {
          user_nme
          user_id
        }
      }
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUser($userInfo: UpdateUserInput!) {
    updateUser(userInfo: $userInfo) {
      success
      message
      result {
        user_id
      }
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query findUserById($id: ID!) {
    findUserById(id: $id) {
      success
      message
      result {
        user_id
        user_nme
        email_address
        phone_nbr
        icon_url
        gender
      }
    }
  }
`;
