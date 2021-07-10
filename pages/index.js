import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  return (
    <ul>
      {props.products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (data.products.length === 0) return { notFound: true };

  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
  };
}

export default HomePage;
