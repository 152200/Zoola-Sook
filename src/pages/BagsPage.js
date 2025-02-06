import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductsSection from '../partials/ProductsSection';
import { useProducts } from '../hooks/useProducts';

export default function BagsPage() {
  const { products, loading } = useProducts("حقائب للمناسبات");

  return (
    <PageLayout title="حقائب">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsSection props={{ category: products }} />
      )}
    </PageLayout>
  );
}