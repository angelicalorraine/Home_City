import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faCity, faSearch } from "@fortawesome/free-solid-svg-icons";
import BannerCard from "./BannerCard";
import { Container } from 'react-bootstrap';
const BannerIntro = () => {
  let bannerCards = [
    {
      headerIcon: <FontAwesomeIcon icon={faSearch} size="3x" className=".fa-gradient" />,
      title: "Search",
      text: "Your search reports life-quality scores for US cities, across various categories based on a 10-point scoring system."
    },
    {
      headerIcon: <FontAwesomeIcon icon={faChartBar} size="3x" />,
      title: "Analyze",
      text: " View your saved city population statistics and quality of life to get an accurate and better view of your potential new home.  "

    },
    {
      headerIcon: <FontAwesomeIcon icon={faCity} size="3x" />,
      title: "Compare",
      text: " A decision making tool to visually compare each cities cost of living side by side to help find your future Home City  ."

    }
  ];

  return (
    <Container >
      <div id="education-cards" className="row my-5 justify-content-between p-5">
        {bannerCards.map((bannerCard, i) => <BannerCard key={i} {...bannerCard} />)}
      </div>
    </Container>
  )
}

export default BannerIntro;