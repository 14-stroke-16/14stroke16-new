import Masonry from "react-masonry-css";

export default function MasonryGrid({ children }) {
    const breakpointColumnsObj = {
      default: 3, // Number of columns for the default breakpoint
      1100: 2, // Number of columns for the 1100px breakpoint
      700: 1, // Number of columns for the 700px breakpoint
    };

    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {children}
      </Masonry>
    );
}
