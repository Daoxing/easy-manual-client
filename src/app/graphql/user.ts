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
        group_id
        group_nme
      }
    }
  }
`;
