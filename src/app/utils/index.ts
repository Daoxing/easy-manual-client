import _ from 'lodash';
export function getDiff(oldItem, newItem) {
  const result: { [key: string]: any } = {};
  Object.entries(oldItem).forEach(([k, v]) => {
    if (newItem.hasOwnProperty(k)) {
      if (_.get(newItem, k) !== v) {
        result[k] = _.get(newItem, k);
      }
    }
  });
  return result;
}
