const BanterLoader = ({para}: {para: string}) => {
  return (
    <>
      <div className="banter-loader-container select-none">
        <div className="banter-loader">
          <div className="banter-loader-box"></div>
          <div className="banter-loader-box"></div>
          <div className="banter-loader-box"></div>
        </div>
        <p className="banter-loader-text text-center ">
         {para}
          <span className="banter-loader-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      </div>

      <style>
        {`
          .banter-loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }

          .banter-loader {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .banter-loader-box {
            width: 16px;
            height: 16px;
            border: 2px solid #000;
            background: var(--color-primary);
            animation: bounce 0.6s ease-in-out infinite;
          }

          .banter-loader-box:nth-child(1) {
            animation-delay: 0s;
          }

          .banter-loader-box:nth-child(2) {
            animation-delay: 0.1s;
            background: var(--color-secondary);
          }

          .banter-loader-box:nth-child(3) {
            animation-delay: 0.2s;
          }

          .banter-loader-text {
            font-family: "main-font", sans-serif;
            font-size: 1.25rem;
            color: #000;
            font-weight: 500;
            letter-spacing: 0.5px;
          }

          .banter-loader-dots {
            display: inline-block;
          }

          .banter-loader-dots span {
            animation: dots 1.4s infinite ease-in-out both;
          }

          .banter-loader-dots span:nth-child(1) {
            animation-delay: -0.32s;
          }

          .banter-loader-dots span:nth-child(2) {
            animation-delay: -0.16s;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes dots {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default BanterLoader;
