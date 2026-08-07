export const subMenuItems = (title: string) => {
  switch (title) {
    case 'HTML':
      return [
        {
          id: 1,
          label: 'Semantic HTML',
          value: 'semantic-html',
        },
        {
          id: 2,
          label: 'Data List',
          value: 'data-list',
        },
      ];
    case 'CSS':
      return [
        {
          id: 1,
          label: 'CSS',
          value: 'css',
        },
      ];
    case 'JS/TS':
      return [
        {
          id: 1,
          label: 'JS/TS',
          value: 'js-ts',
        },
      ];
    case 'React':
      return [
        {
          id: 1,
          label: 'React',
          value: 'react',
        },
      ];
    default:
      return [];
  }
};

export default subMenuItems;
