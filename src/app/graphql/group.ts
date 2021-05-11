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

export const MY_JOINED_GROUPS = gql`
  query joinedGroups($sort: Order, $page: Pagination) {
    joinedGroups(sort: $sort, page: $page) {
      totalCount
      groups {
        group_nme
        created_user {
          user_id
          user_nme
        }
        created_tms
        group_id
        group_intro
      }
      page {
        pageNo
        pageCount
      }
    }
  }
`;
