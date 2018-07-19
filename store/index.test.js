import store from './'

it('store should match snapshot', () => {
    const state = store.getState();
    expect(state).toMatchSnapshot();
});