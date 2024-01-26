"use client"

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./module.css";

export default function UpdateProductPage({product: oldProduct}) {
    const [product, setProduct] = useState({
        title: oldProduct.title,
        description: oldProduct.description,
        price: oldProduct.price,
    });

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (product.price <= 0) {
            alert("El precio debe ser mayor a 0")
        } else {
            await saveProduct();
        }
    };

    const saveProduct = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products/' + oldProduct.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)

            }
            );
            if (res.status === 200) {
                alert("Producto guardado exitosamente")
                router.push('/products');
            }
        } catch (error) {
            console.log("error" + JSON.stringify(error))
        }
    }

    return (
        <main>
            <div>
                <h1>Crear Nuevo Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="price">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <button type="submit" className="addButton">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
