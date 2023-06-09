  import { takeEvery, call, put } from 'redux-saga/effects';
  import { firestore , convertCollectionsSnapshotToMap} from '../../firebase/firebase.util';

  import { fetchCollectionSuccess,
fetchCollectionFailure} from './shop.actions';
  import ShopActionTypes from './shop.types';

  export function* fetchCollectionsAsync() {
      yield console.log('I am fired');
      try {const collectionRef = firestore.collection('collections');
      const snapshot = yield collectionRef.get();
      const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
      yield put(fetchCollectionSuccess(collectionsMap));
      } catch(err) {
        yield put(fetchCollectionFailure(err.message));
      }
  }

  export function* fetchCollectionsStart() {
      yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);

   
  }