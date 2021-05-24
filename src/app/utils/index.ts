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

export function closeModal(bsModal: {
  setClass: (newClass: string) => void;
  hide: () => void;
}) {
  return new Promise<void>((resolve) => {
    if (bsModal && bsModal.setClass && bsModal.hide) {
      bsModal.hide();
    }
    resolve();
  });
}
