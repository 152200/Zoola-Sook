import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductsSection from '../partials/ProductsSection';
import { useProducts } from '../hooks/useProducts';

export default function WalletsPage() {
  const { products, loading } = useProducts("محافظ");

  return (
    <PageLayout title="محافظ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsSection props={{ category: products }} />
      )}
    </PageLayout>
  );
}