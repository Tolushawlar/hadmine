import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/products/product.module.css";
import Image from "next/image";
import Link from "next/link";
import { searchParams } from "next/navigation";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";

const pros = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((pro) => (
            <tr key={pro.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={pro.img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {pro.title}
                </div>
              </td>
              <td>{pro.desc}</td>
              <td># {pro.price}</td>
              <td>{pro.createdAt?.toString().slice(4, 16)}</td>
              <td>{pro.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${pro.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={pro.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {/* <tr >
              <td>
                <div className={styles.pro}>
                  <Image
                    src="/nopro.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.proImage}
                  />
                  A phone
                </div>
              </td>
              <td>this is the decription</td>
              <td># 10000</td>
              <td>Aug 2022</td>
              <td>12</td>
              <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/pros/">
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr> */}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default pros;
