import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductsSection from '../partials/ProductsSection';
import { useProducts } from '../hooks/useProducts';

export default function CapsGlassesPage() {
  const { products, loading } = useProducts("طواقي ونظارات");

  return (
    <PageLayout title="طواقي و نظارات">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsSection props={{ category: products }} />
      )}
    </PageLayout>
  );
}
