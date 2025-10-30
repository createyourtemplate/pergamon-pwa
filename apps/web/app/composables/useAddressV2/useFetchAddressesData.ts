export const useFetchAddressesData = () => {
  const state = useState('useFetchAddressesData', () => ({
    loading: false,
  }));

  
  // const fetch = async () => {
  //   try {
  //     state.value.loading = true;

  //     const { data } = await useSdk().plentysystems.getAddressesData({
  //       types: [],
  //       lang: locale.value,
  //     });

  //     processAddresses(data.addresses);

  //     if (data.countries) {
  //       setCountries(data.countries.default, data.countries.geoRegulated);
  //     }

  //     state.value.loading = false;
  //   } catch (error: unknown) {
  //     useHandleError(error as ApiError);
  //     setAddresses([], []);
  //     state.value.loading = false;
  //   }
  // };

  const fetchServer = async () => {
  };

  return {
    fetch,
    fetchServer,
    ...toRefs(state.value),
  };
};
