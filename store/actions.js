export const favourite = index => (
    {
      type: 'favourite',
      payload: index,
    }
);
export const archive = index => (
    {
      type: 'archive',
      payload: index,
    }
);
export const trash = index => (
    {
      type: 'trash',
      payload: index,
    }
);
export const restore = index => (
    {
      type: 'restore',
      payload: index,
    }
);
export const deleteForever = index => (
    {
      type: 'deleteForever',
      payload: index,
    }
);
export const markListened = index => (
    {
      type: 'markListened',
      payload: index,
    }
);
