import { gql } from 'apollo-angular';
export const CREATE_GROUP = gql`
  mutation createGroup($groupInfo: createGroupInput!) {
    createGroup(groupInfo: $groupInfo) {
      success
      message
      result {
        group_id
        group_nme
        group_intro
        created_user {
          user_id
          user_nme
        }
      }
    }
  }
`;
