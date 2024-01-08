import { useEffect, useState, useMemo, SyntheticEvent } from 'react';
import { Link, useLoaderData, useLocation, useParams } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// project imports
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import RelatedProducts from './RelatedProducts';

import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import FloatingCart from 'ui-component/cards/FloatingCart';

import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { resetCart } from 'store/slices/cart';

// types
import { DefaultRootStateProps, TabsProps } from 'types';
import { Products } from 'types/e-commerce';

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `product-details-tab-${index}`,
        'aria-controls': `product-details-tabpanel-${index}`
    };
}

const ProductDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const cart = useSelector((state: DefaultRootStateProps) => state.cart);
    const product = useLoaderData() as Products;

    // product description tabs
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        // clear cart if complete order
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const productImages = useMemo(() => <ProductImages product={product} />, [product]);
    const productReview = useMemo(() => <ProductReview product={product} />, [product]);
    const relatedProducts = useMemo(() => <RelatedProducts id={id} />, [id]);

    return (
        <>
            {product && Number(product.id) === Number(id) && (
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12} lg={10}>
                        <MainCard>
                            {product && product?.id === Number(id) && (
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} md={6}>
                                        {productImages}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ProductInfo product={product} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Tabs
                                            value={value}
                                            indicatorColor="primary"
                                            onChange={handleChange}
                                            sx={{}}
                                            aria-label="product description tabs example"
                                            variant="scrollable"
                                        >
                                            <Tab component={Link} to="#" label="Description" {...a11yProps(0)} />
                                            <Tab
                                                component={Link}
                                                to="#"
                                                label={
                                                    <Stack direction="row" alignItems="center">
                                                        Reviews{' '}
                                                        <Chip
                                                            label={String(product.offerPrice?.toFixed(0))}
                                                            size="small"
                                                            chipcolor="secondary"
                                                            sx={{ ml: 1.5 }}
                                                        />
                                                    </Stack>
                                                }
                                                {...a11yProps(1)}
                                            />
                                        </Tabs>
                                        <TabPanel value={value} index={0}>
                                            <ProductDescription />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            {productReview}
                                        </TabPanel>
                                    </Grid>
                                </Grid>
                            )}
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
                        <Typography variant="h2">Related Products</Typography>
                    </Grid>
                    <Grid item xs={11} lg={10}>
                        {relatedProducts}
                    </Grid>
                    <FloatingCart />
                </Grid>
            )}
        </>
    );
};

export default ProductDetails;
