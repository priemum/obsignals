function useEditTitle(title){
    let titleActive = title.replace('/', '')

    return {
      titleActive
    }
}

export default useEditTitle