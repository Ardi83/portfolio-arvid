import {type HTMLDataItemsType} from '../../store/useHTMLDataStore';

const NoteView = ({item}: {item: HTMLDataItemsType}) => {
  return (
    <div>
      <h1>{item.title}</h1>
      <h2>{item.subTitle}</h2>
      <p>{item.description}</p>
      <p>{item.example}</p>
    </div>
  );
};

export default NoteView;
