"use client"

import { useState, useEffect } from 'react';
import "./module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
    const [productData, setProductData] = useState([]);
    const router = useRouter();

    const getServerSideProps = async () => {

        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        console.log("data" + JSON.stringify(data));
        if (data.hasOwnProperty("products")) setProductData(data.products)
    }

    useEffect(() => {
        getServerSideProps();
    }, []);

    const navigateToEdit = (product) => {
        router.push('/Update');
    }

    return (
        <main>
            <div>
                <div className='heading-page'>
                    <h1>Productos</h1>
                    <Link href="/Create" className="addButton">
                        Agregar Producto
                    </Link>
                </div>
                <ul>
                    {productData.map((product) => (
                        <li key={product.id} className="productItem">
                            <div className="productThumbnail">
                                <img src={product.thumbnail} alt={product.title} />
                            </div>
                            <div className="productInfo">
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <p>Precio: ${product.price}</p>
                            </div>
                            <button onClick={() => navigateToEdit(product)}>
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
