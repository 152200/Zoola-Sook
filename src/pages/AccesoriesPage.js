import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductsSection from '../partials/ProductsSection';
import { useProducts } from '../hooks/useProducts';

export default function AccesoriesPage() {
  const { products, loading } = useProducts("أكسسوارات وشالات");

  return (
    <PageLayout title="إكسسوارات">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsSection props={{ category: products }} />
      )}
    </PageLayout>
  );
}