/* eslint-disable react-hooks/exhaustive-deps */
import FilterFood from '@/components/Food/FilterFood';
import FoodGrid from '@/components/Food/FoodGrid';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useAuthContext } from '@/contexts/AuthContext';
import { useFoodListQuery } from '@/hooks/Foods/useFoodContext';
import { IFoodReadModel } from '@/services/Foods/Foods.type';
import { PhoneIcon, RefreshCcw } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';

const ITEMS_PER_PAGE = 20;

export const Home: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate(); 
  const {isAuthenticated} = useAuthContext(); 
  const [page, setPage] = useState(0);
  const { isMobile } = useSidebar();
  const [allFoods, setAllFoods] = useState<IFoodReadModel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasMore, setHasMore] = useState(true);

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: refetchFoodList
  } = useFoodListQuery({ page, size: ITEMS_PER_PAGE });

  const isLoadingMore = isFetching && page > 0;

  useEffect(() => {
    if (data?.data) {
      const fetchedFoods = data.data;

      setAllFoods(prev => {
        const existingIds = new Set(prev.map(f => f.id));
        const newFoods = fetchedFoods.filter(f => !existingIds.has(f.id));
        return [...prev, ...newFoods];
      });

      if (fetchedFoods.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      const combinedFoods = [...allFoods, ...fetchedFoods];
      const uniqueCategories = Array.from(new Set(
        combinedFoods
          .filter(food => food.category)
          .map(food => food.category as string)
      ));
      setCategories(uniqueCategories);
    }
  }, [data]);

  const lastFoodElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore || activeCategory !== 'all') return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore, activeCategory]);

  const filteredFoods = activeCategory === 'all'
    ? allFoods
    : allFoods.filter(food => food.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    refetchFoodList();
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className='flex justify-between items-center gap-1 flex-wrap mb-5'>
          <div >
            <h2 className="text-3xl font-bold mb-2">Nosso Cardápio</h2>
            <p className="text-gray-300">Descubra nossos pratos deliciosos preparados com ingredientes frescos.</p>
          </div>
          {!isMobile &&
            <div className='flex items-center gap-2'>
              <Button variant='outline' onClick={() => refetchFoodList()} className='mb-3'>
                <RefreshCcw />
                Atualizar
              </Button>
             {!isAuthenticated && 
             <Button 
                onClick={() => navigate('/contato')} 
                className='mb-3 bg-orange-700 text-white hover:bg-orange-800'
              >
                <PhoneIcon />
                Entrar em contato
              </Button>}
            </div>}
        </div>

        <FilterFood
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <FoodGrid
          foods={filteredFoods}
          isLoading={isLoading}
          error={error}
          lastFoodRef={lastFoodElementRef}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
};
