import { useStates } from "./utilities/states";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { scrollRestore } from "./utilities/scrollBehavior";
import CategorySelect from "./CategorySelect";
import { sweFormat } from "./utilities/currencyFormatter";
import { missingImage } from "./utilities/handleMissingImage";
import ReactDOM from "react-dom/client";

export default function ProductList() {
  scrollRestore();

  let s = useStates("main");
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  return (
    <Container className="productList">
      <Row>
        <Col>
          <h1>Produkter</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button> Testknapp</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <CategorySelect showAllOption bindTo={[s, "chosenCategoryId"]} />
        </Col>
      </Row>
      {s.products
        .filter(
          (product) =>
            s.chosenCategoryId === 0 /*all*/ ||
            s.chosenCategoryId === product.categoryId
        )
        .map(({ id, name, description, price }) => (
          <Row className="product" key={id} onClick={() => showDetail(id)}>
            <Card>
              <Col xxl="12">
                <h3>{name}</h3>
                <img
                  onError={(event) => missingImage(event, name)}
                  className="float-end ms-3"
                  style={{ width: 250, height: 150, objectFit: "cover" }}
                  src={`/images/products/${id}.jpg`}
                />
                <p>{description}</p>
              </Col>
              <Col xxl="12">
                <h4>
                  <b>Pris:</b> {sweFormat(price)}
                </h4>
              </Col>
            </Card>
          </Row>
        ))}
    </Container>
  );
}
