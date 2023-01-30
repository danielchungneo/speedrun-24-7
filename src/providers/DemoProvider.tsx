/**
 * TODO: REMOVE_ME
 * ! remove this entire file to delete all CT data
 */

import React, { useCallback, useContext, useState } from 'react';
import {
  IArticle,
  ICategory,
  IProduct,
  IUser,
  IUseDemo,
  IBasket,
  INotification,
} from '@/constants/types';

import {
  USERS,
  FOLLOWING,
  TRENDING,
  CATEGORIES,
  ARTICLES,
  RECOMMENDATIONS,
  BASKET,
  NOTIFICATIONS,
} from '@/constants/mocks';

export const DemoContext = React.createContext({});

const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [basket, setBasket] = useState<IBasket>(BASKET);
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [following, setFollowing] = useState<IProduct[]>(FOLLOWING);
  const [trending, setTrending] = useState<IProduct[]>(TRENDING);
  const [categories, setCategories] = useState<ICategory[]>(CATEGORIES);
  const [recommendations, setRecommendations] =
    useState<IArticle[]>(RECOMMENDATIONS);
  const [articles, setArticles] = useState<IArticle[]>(ARTICLES);
  const [article, setArticle] = useState<IArticle>({});
  const [notifications, setNotifications] =
    useState<INotification[]>(NOTIFICATIONS);

  // handle users / profiles
  const handleUsers = useCallback(
    (payload: IUser[]) => {
      // set users / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(users)) {
        setUsers({ ...users, ...payload });
      }
    },
    [users, setUsers]
  );

  // handle basket
  const handleBasket = useCallback(
    (payload: IBasket) => {
      // set basket items / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(basket)) {
        const subtotal = payload?.items?.reduce((total, item) => {
          total += (item.price || 0) * (item.qty || 1);
          return total;
        }, 0);
        setBasket({ ...basket, ...payload, subtotal });
      }
    },
    [basket, setBasket]
  );

  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser]
  );

  // handle Article
  const handleArticle = useCallback(
    (payload: IArticle) => {
      // set article / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(article)) {
        setArticle(payload);
      }
    },
    [article, setArticle]
  );

  // handle Notifications
  const handleNotifications = useCallback(
    (payload: INotification[]) => {
      // set notifications / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(notifications)) {
        setNotifications(payload);
      }
    },
    [notifications, setNotifications]
  );

  const contextValue = {
    user,
    users,
    handleUsers,
    handleUser,
    basket,
    handleBasket,
    following,
    setFollowing,
    trending,
    setTrending,
    categories,
    setCategories,
    recommendations,
    setRecommendations,
    articles,
    setArticles,
    article,
    handleArticle,
    notifications,
    handleNotifications,
  };

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
};

export default DemoProvider;
