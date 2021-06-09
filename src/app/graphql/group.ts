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
          icon_url
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
          icon_url
          display_nme
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
export const GROUP_INFO = gql`
  query groupInfo($group_id: ID!) {
    groupInfo(group_id: $group_id) {
      success
      message
      result {
        group_nme
        created_user {
          user_id
          user_nme
          icon_url
        }
        created_tms
        group_id
        group_intro
        joined_group
      }
    }
  }
`;
export const LEAVE_GROUP = gql`
  mutation leaveGroup($group_id: ID!) {
    leaveGroup(group_id: $group_id) {
      success
      message
    }
  }
`;
