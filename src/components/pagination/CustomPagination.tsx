import { Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import "./CustomPagination.scss";

interface ICustomPaginationProps {
  count: number;
  itemsPerPage: number;
  urlPage: string;
  activePage: string;
  nameBtnBack?: string;
  nameBtnNext?: string;
}

const CustomPagination = ({
  count,
  itemsPerPage,
  urlPage,
  activePage,
  nameBtnBack,
  nameBtnNext,
}: ICustomPaginationProps) => {
  const navigate = useNavigate();

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`${urlPage}/${value}`);
  };

  return (
    <Pagination
      count={Math.ceil(count / itemsPerPage)}
      onChange={handleChangePage}
      className="customPagination"
      page={Number(activePage)}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: () => (nameBtnBack ? <p>{nameBtnBack}</p> : <NavigateBeforeOutlinedIcon />),
            next: () => (nameBtnNext ? <p>{nameBtnNext}</p> : <NavigateNextOutlinedIcon />),
          }}
          {...item}
        />
      )}
    />
  );
};

export default CustomPagination;
