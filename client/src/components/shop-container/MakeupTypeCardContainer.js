import { useEffect, useState } from "react";
import { ProductCard } from "../../components";
import PropTypes from "prop-types";
const MakeupTypeCardContainer = (props) => {
  const [type] = useState([]);
  const { params, makeup_type, productType } = props;

  useEffect(() => {
    productType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      {makeup_type && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3">
          {makeup_type.map((type) => {
            if (
              params.slug === type.product_type ||
              params.slug === type.brand ||
              params.slug === type.category
            ) {
              return (
                <div key={type.id}>
                  <ProductCard info={type} />
                </div>
              );
            } else {
              return "";
            }
          })}
        </div>
      )}
    </>
  );
};

MakeupTypeCardContainer.propTypes = {
  type: PropTypes.array,
  params: PropTypes.object,
  makeup_type: PropTypes.array,
  productType: PropTypes.func,
};

export default MakeupTypeCardContainer;
