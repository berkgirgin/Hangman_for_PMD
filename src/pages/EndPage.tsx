import classes from "../styles/EndPage.module.css";

type EndPageProps = {
  isWon: boolean;
};

function EndPage({ isWon }: EndPageProps) {
  return (
    <>
      <div className={`${classes["endpage-main-container"]}`}>
        <h1>End Page</h1>
      </div>

      <div> {isWon === true ? "WON" : "LOST"}</div>
    </>
  );
}

export { EndPage };
