import fs from "fs/promises";
import path from "path";

export default function ProductDetail({ loadedProduct }) {
  if (!loadedProduct) return <p>Loading...</p>;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find(product => product.id === productId);

  if (!product) return { notFound: true };

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const params = data.products.map(product => ({
    params: { pid: product.id },
  }));

  return {
    paths: params,
    fallback: true, //or "blocking" to wait until the data is fully fetched
  };
}
