import * as functions from 'firebase-functions';

export const onProjectCreation = functions.firestore
.document('projects/{projectId}')
.onCreate((snap, context) => {
    return snap.ref.set({
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
});

export const onProjectUpdate = functions.firestore
.document('projects/{projectId}')
.onUpdate((snap, context) => {
    const data = snap.after.data();
    const previousData = snap.before.data();
    if (data.name === previousData.name) return null;
    return snap.after.ref.set({
      updatedAt: new Date(),
    }, { merge: true });
});
