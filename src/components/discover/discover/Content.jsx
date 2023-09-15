import ContentRight from './ContentRight';
import ContentLeft from './ContentLeft';

const Content = () => (
  <div className="w-full relative border-solid border-r-[1px] border-l-[1px] border-[#d3d3d3] h-[1362px]">
    <ContentLeft />
    <ContentRight />
  </div>
);

export default Content;
