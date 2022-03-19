/* const allmembers = await API.get('user/query');
options = {
   header: 'add/remove a member',
   selected: sortMembers(members, true), //2nd param is "email only" boolean
   selectables: sortMembers(allmembers, true),
   saveHandler: async (newMembers) => {
      console.log('wheel save handler executed', newMembers);
      const body = { members: newMembers };
      updateMembers(body);
      setEditMode(null);
   },
   cancelHandler: () => {
      setEditMode(null);
   },
}; */
