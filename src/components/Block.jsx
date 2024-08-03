import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Block = ({ className = "", ButtonText, HeadderL1, HeadderL2, onButtonClick, children }) => {
  const page = ButtonText === "Sign in" ? "Sign in" : "Sign up";
  return (
    <div
      className={`w-[557px] rounded-xl bg-black bg-opacity-100 border border-black overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[86px] px-16 pb-[65px] box-border gap-[26px] mix-blend-normal max-w-full z-[1] text-left text-11xl text-white font-paytone-one mq675:pt-14 mq675:px-8 mq675:pb-[42px] mq675:box-border ${className}`}
    >
      <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[21px]">
        <h1 className="m-0 relative text-inherit font-normal font-inherit mq450:text-lg mq800:text-5xl">
          <p className="m-0">{HeadderL1}</p>
          <p className="m-0">{HeadderL2}</p>
        </h1>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-px box-border max-w-full text-mini font-poppins">
        <div className="flex-1 flex flex-col items-start justify-start gap-[4px] max-w-full">
          <div className="flex flex-row items-start justify-start py-0 px-[35px]"></div>
          <div className="self-stretch flex flex-row flex-wrap items-end justify-start gap-[15px] max-w-full">
            <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3px]">
              <div className="flex flex-col items-start justify-start gap-[75px]">
                <div className="flex flex-col items-start justify-start gap-[30px]">
                  {children}
                  <div className="font-bold text-purple-300">
                    {page === "Sign in" ? "Dont have an account ..." : "Already have an account ..."}
                    <Link to={page === "Sign in" ? "/signup" : "/signin"}> {page === "Sign in" ? "Sign up" : "Sign in"}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-px box-border max-w-full">
        <Button
          className="flex-1 whitespace-nowrap max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border"
          variant="primary"
          onClick={onButtonClick}
        >
         {ButtonText}
        </Button>
      </div>
    </div>
  );
};

export default Block;

