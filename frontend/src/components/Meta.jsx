import {Helmet} from 'react-helmet-async'


function Meta({title, description, keywords}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Shop',
  description: 'we sell electronic products for cheap',
  keywords: 'electronics, buy electronics, cheaper electronic products'
}

export default Meta;