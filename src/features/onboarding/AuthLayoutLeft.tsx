import { Carousel, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AuthLayoutLeft = () => {
  const carouselSlides = [
    {
      subtitle: "Centralized Hiring for Fast-Moving Teams",
      description:
        "Create roles, publish jobs, and review applications in one place. QuickHire gives your team a focused, admin-first console for managing the entire hiring pipeline.",
    },
    {
      subtitle: "High-Signal Applications, Less Noise",
      description:
        "See structured applications with rich job descriptions, candidate details, and links to resumes so you can move from screening to shortlisting quickly.",
    },
    {
      subtitle: "Designed for Clarity and Speed",
      description:
        "A clean dashboard, clear navigation, and purpose-built admin tools help you stay on top of open roles, new applications, and hiring decisions.",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={true}
          dotPosition="bottom"
        >
          {carouselSlides.map((slide, index) => (
            <div key={index}>
              <div
                style={{
                  padding: "2rem 0",
                  textAlign: "center",
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title
                  level={1}
                  style={{
                    color: "#ffffff",
                    textAlign: "center",
                    marginBottom: "2rem",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  title="QuickHire Admin Console"
                >
                  QuickHire Admin Console
                </Title>

                {/* Logo */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    // onClick={() =>
                    //   window.open("https://dataondeck.io", "_blank")
                    // }
                    title="Visit QuickHire Console"
                  >
                    <img
                      src="/logo.svg"
                      alt="QuickHire Console"
                      style={{ height: "60px", width: "auto" }}
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <Title
                  level={3}
                  style={{
                    color: "#ffffff",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    fontWeight: "500",
                  }}
                >
                  {slide.subtitle}
                </Title>

                {/* Description */}
                <Paragraph
                  style={{
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    opacity: 0.9,
                    maxWidth: "500px",
                    margin: "0 auto",
                  }}
                >
                  {slide.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Carousel dot styling */}
      <style>{`
        .ant-carousel .slick-dots {
          bottom: 20px;
        }
        
        .ant-carousel .slick-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
        }
        
        .ant-carousel .slick-dots li.slick-active button {
          background-color: white;
          border-color: white;
        }
        
        .ant-carousel .slick-slide > div {
          height: 100%;
        }
        
        .ant-carousel .slick-list,
        .ant-carousel .slick-track {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default AuthLayoutLeft;
