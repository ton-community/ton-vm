import { Cell } from 'ton';
import BN from 'bn.js';
export type OpCodes = 
    | { code: 'XCHG', args: [number, number] }
    | { code: 'XCHG2', args: [number, number] }
    | { code: 'XCHG3', args: [number, number, number] }
    | { code: 'PUSH', args: [number] }
    | { code: 'PUSH2', args: [number, number] }
    | { code: 'PUSH3', args: [number, number, number] }
    | { code: 'POP', args: [number] }
    | { code: 'XCPU', args: [number, number] }
    | { code: 'XCPU2', args: [number, number, number] }
    | { code: 'XCPUXC', args: [number, number, number] }
    | { code: 'XC2PU', args: [number, number, number] }
    | { code: 'PUXC', args: [number, number] }
    | { code: 'PUXC2', args: [number, number, number] }
    | { code: 'PU2XC', args: [number, number, number] }
    | { code: 'PUXCPU', args: [number, number, number] }
    | { code: 'BLKSWAP', args: [number, number] }
    | { code: 'ROT' }
    | { code: 'ROTREV' }
    | { code: 'SWAP2' }
    | { code: 'DROP2' }
    | { code: 'DUP2' }
    | { code: 'OVER2' }
    | { code: 'REVERSE', args: [number, number] }
    | { code: 'BLKDROP', args: [number] }
    | { code: 'BLKPUSH', args: [number, number] }
    | { code: 'PICK' }
    | { code: 'BLKSWX' }
    | { code: 'DROPX' }
    | { code: 'TUCK' }
    | { code: 'XCHGX' }
    | { code: 'DEPTH' }
    | { code: 'CHKDEPTH' }
    | { code: 'ONLYTOPX' }
    | { code: 'ONLYX' }
    | { code: 'BLKDROP2', args: [number, number] }
    | { code: 'ROLLX' }
    | { code: 'ROLLREVX' }
    | { code: 'REVX' }
    | { code: 'NULL' }
    | { code: 'ISNULL' }
    | { code: 'TUPLE', args: [number] }
    | { code: 'INDEX', args: [number] }
    | { code: 'UNTUPLE', args: [number] }
    | { code: 'UNPACKFIRST', args: [number] }
    | { code: 'CHKTUPLE' }
    | { code: 'EXPLODE', args: [number] }
    | { code: 'SETINDEX', args: [number] }
    | { code: 'INDEXQ', args: [number] }
    | { code: 'SETINDEXQ', args: [number] }
    | { code: 'TUPLEVAR' }
    | { code: 'INDEXVAR' }
    | { code: 'UNTUPLEVAR' }
    | { code: 'UNPACKFIRSTVAR' }
    | { code: 'EXPLODEVAR' }
    | { code: 'SETINDEXVAR' }
    | { code: 'INDEXVARQ' }
    | { code: 'SETINDEXVARQ' }
    | { code: 'TLEN' }
    | { code: 'QTLEN' }
    | { code: 'ISTUPLE' }
    | { code: 'LAST' }
    | { code: 'TPUSH' }
    | { code: 'TPOP' }
    | { code: 'NULLSWAPIF' }
    | { code: 'NULLSWAPIFNOT' }
    | { code: 'NULLROTRIF' }
    | { code: 'NULLROTRIFNOT' }
    | { code: 'NULLSWAPIF2' }
    | { code: 'NULLSWAPIFNOT2' }
    | { code: 'NULLROTRIF2' }
    | { code: 'NULLROTRIFNOT2' }
    | { code: 'INDEX2', args: [number, number] }
    | { code: 'CADR' }
    | { code: 'CDDR' }
    | { code: 'CADDR' }
    | { code: 'CDDDR' }
    | { code: 'INDEX3', args: [number, number, number] }
    | { code: 'PUSHINT', args: [BN] }
    | { code: 'PUSHPOW2', args: [number] }
    | { code: 'PUSHNAN' }
    | { code: 'PUSHPOW2DEC', args: [number] }
    | { code: 'PUSHNEGPOW2', args: [number] }
    | { code: 'PUSHREF' }
    | { code: 'PUSHREFSLICE' }
    | { code: 'PUSHREFCONT' }
    | { code: 'PUSHSLICE' }
    | { code: 'PUSHCONT' }
    | { code: 'ADD' }
    | { code: 'SUB' }
    | { code: 'SUBR' }
    | { code: 'ADDCONST', args: [number] }
    | { code: 'MULCONST', args: [number] }
    | { code: 'MUL' }
    | { code: 'DIV', args: [boolean, number, boolean, number, number] }
    | { code: 'LSHIFT', args: [number] }
    | { code: 'RSHIFT', args: [number] }
    | { code: 'POW2' }
    | { code: 'AND' }
    | { code: 'OR' }
    | { code: 'XOR' }
    | { code: 'NOT' }
    | { code: 'FITS', args: [number] }
    | { code: 'UFITS', args: [number] }
    | { code: 'FITSX' }
    | { code: 'UFITSX' }
    | { code: 'BITSIZE' }
    | { code: 'UBITSIZE' }
    | { code: 'MIN' }
    | { code: 'MAX' }
    | { code: 'MINMAX' }
    | { code: 'ABS' }
    | { code: 'QUIET' }
    | { code: 'SGN' }
    | { code: 'LESS' }
    | { code: 'EQUAL' }
    | { code: 'LEQ' }
    | { code: 'GREATER' }
    | { code: 'NEQ' }
    | { code: 'GEQ' }
    | { code: 'CMP' }
    | { code: 'EQINT', args: [number] }
    | { code: 'ISZERO' }
    | { code: 'LESSINT', args: [number] }
    | { code: 'ISNEG' }
    | { code: 'ISNPOS' }
    | { code: 'GTINT', args: [number] }
    | { code: 'ISPOS' }
    | { code: 'ISNNEG' }
    | { code: 'NEQINT', args: [number] }
    | { code: 'ISNAN' }
    | { code: 'CHKNAN' }
    | { code: 'SEMPTY' }
    | { code: 'SDEMPTY' }
    | { code: 'SREMPTY' }
    | { code: 'SDFIRST' }
    | { code: 'SDLEXCMP' }
    | { code: 'SDEQ' }
    | { code: 'SDPFX' }
    | { code: 'SDPFXREV' }
    | { code: 'SDPPFX' }
    | { code: 'SDPPFXREV' }
    | { code: 'SDSFX' }
    | { code: 'SDSFXREV' }
    | { code: 'SDPSFX' }
    | { code: 'SDPSFXREV' }
    | { code: 'SDCNTLEAD0' }
    | { code: 'SDCNTLEAD1' }
    | { code: 'SDCNTTRAIL0' }
    | { code: 'SDCNTTRAIL1' }
    | { code: 'NEWC' }
    | { code: 'ENDC' }
    | { code: 'STI', args: [number] }
    | { code: 'STU', args: [number] }
    | { code: 'STREF' }
    | { code: 'STBREFR' }
    | { code: 'STSLICE' }
    | { code: 'STIX' }
    | { code: 'STUX' }
    | { code: 'STIXR' }
    | { code: 'STUXR' }
    | { code: 'STIXQ' }
    | { code: 'STUXQ' }
    | { code: 'STIXRQ' }
    | { code: 'STUXRQ' }
    | { code: 'STIR', args: [number] }
    | { code: 'STUR', args: [number] }
    | { code: 'STIQ', args: [number] }
    | { code: 'STUQ', args: [number] }
    | { code: 'STIRQ', args: [number] }
    | { code: 'STURQ', args: [number] }
    | { code: 'STBREF' }
    | { code: 'STB' }
    | { code: 'STREFR' }
    | { code: 'STSLICER' }
    | { code: 'STBR' }
    | { code: 'STREFQ' }
    | { code: 'STBREFQ' }
    | { code: 'STSLICEQ' }
    | { code: 'STBQ' }
    | { code: 'STREFRQ' }
    | { code: 'STBREFRQ' }
    | { code: 'STSLICERQ' }
    | { code: 'STBRQ' }
    | { code: 'STREFCONST' }
    | { code: 'STREF2CONST' }
    | { code: 'ENDXC' }
    | { code: 'STILE4' }
    | { code: 'STULE4' }
    | { code: 'STILE8' }
    | { code: 'STULE8' }
    | { code: 'BDEPTH' }
    | { code: 'BBITS' }
    | { code: 'BREFS' }
    | { code: 'BBITREFS' }
    | { code: 'BREMBITS' }
    | { code: 'BREMREFS' }
    | { code: 'BREMBITREFS' }
    | { code: 'BCHKBITS', args: [number] }
    | { code: 'BCHKBITSX' }
    | { code: 'BCHKREFS' }
    | { code: 'BCHKBITREFS' }
    | { code: 'BCHKBITSQ', args: [number] }
    | { code: 'BCHKBITSQX' }
    | { code: 'BCHKBITREFSQ' }
    | { code: 'STZEROES' }
    | { code: 'STONES' }
    | { code: 'STSAME' }
    | { code: 'STSLICECONST', args: [Cell] }
    | { code: 'STREF3CONST' }
    | { code: 'BCHKREFSQ' }
    | { code: 'CTOS' }
    | { code: 'ENDS' }
    | { code: 'LDI', args: [number] }
    | { code: 'LDU', args: [number] }
    | { code: 'LDREF' }
    | { code: 'LDREFRTOS' }
    | { code: 'LDSLICE', args: [number] }
    | { code: 'LDIX' }
    | { code: 'LDUX' }
    | { code: 'PLDIX' }
    | { code: 'PLDUX' }
    | { code: 'LDIXQ' }
    | { code: 'LDUXQ' }
    | { code: 'PLDIXQ' }
    | { code: 'PLDUXQ' }
    | { code: 'PLDI', args: [number] }
    | { code: 'PLDU', args: [number] }
    | { code: 'LDIQ', args: [number] }
    | { code: 'LDUQ', args: [number] }
    | { code: 'PLDIQ', args: [number] }
    | { code: 'PLDUQ', args: [number] }
    | { code: 'PLDUZ', args: [number] }
    | { code: 'LDSLICEX' }
    | { code: 'PLDSLICEX' }
    | { code: 'LDSLICEXQ' }
    | { code: 'PLDSLICEXQ' }
    | { code: 'PLDSLICE', args: [number] }
    | { code: 'LDSLICEQ', args: [number] }
    | { code: 'PLDSLICEQ', args: [number] }
    | { code: 'SDCUTFIRST' }
    | { code: 'SDSKIPFIRST' }
    | { code: 'SDCUTLAST' }
    | { code: 'SDSKIPLAST' }
    | { code: 'SDSUBSTR' }
    | { code: 'SDBEGINSX' }
    | { code: 'SDBEGINSXQ' }
    | { code: 'SDBEGINS' }
    | { code: 'SDBEGINSQ' }
    | { code: 'SCUTFIRST' }
    | { code: 'SSKIPFIRST' }
    | { code: 'SCUTLAST' }
    | { code: 'SSKIPLAST' }
    | { code: 'SUBSLICE' }
    | { code: 'SPLIT' }
    | { code: 'SPLITQ' }
    | { code: 'XCTOS' }
    | { code: 'XLOAD' }
    | { code: 'XLOADQ' }
    | { code: 'SCHKBITS' }
    | { code: 'SCHKREFS' }
    | { code: 'SCHKBITREFS' }
    | { code: 'SCHKBITSQ' }
    | { code: 'SCHKREFSQ' }
    | { code: 'SCHKBITREFSQ' }
    | { code: 'PLDREFVAR' }
    | { code: 'SBITS' }
    | { code: 'SREFS' }
    | { code: 'SBITREFS' }
    | { code: 'PLDREFIDX', args: [number] }
    | { code: 'PLDREF' }
    | { code: 'LDILE4' }
    | { code: 'LDULE4' }
    | { code: 'LDILE8' }
    | { code: 'LDULE8' }
    | { code: 'PLDILE4' }
    | { code: 'PLDULE4' }
    | { code: 'PLDILE8' }
    | { code: 'PLDULE8' }
    | { code: 'LDILE4Q' }
    | { code: 'LDULE4Q' }
    | { code: 'LDILE8Q' }
    | { code: 'LDULE8Q' }
    | { code: 'PLDILE4Q' }
    | { code: 'PLDULE4Q' }
    | { code: 'PLDILE8Q' }
    | { code: 'PLDULE8Q' }
    | { code: 'LDZEROES' }
    | { code: 'LDONES' }
    | { code: 'LDSAME' }
    | { code: 'SDEPTH' }
    | { code: 'CDEPTH' }
    | { code: 'EXECUTE' }
    | { code: 'JMPX' }
    | { code: 'CALLXARGS', args: [number, number] }
    | { code: 'JMPXARGS', args: [number] }
    | { code: 'RETARGS', args: [number] }
    | { code: 'RET' }
    | { code: 'RETFALSE' }
    | { code: 'RETBOOL' }
    | { code: 'CALLCC' }
    | { code: 'JMPXDATA' }
    | { code: 'CALLCCARGS', args: [number, number] }
    | { code: 'CALLXVARARGS' }
    | { code: 'RETVARARGS' }
    | { code: 'JMPXVARARGS' }
    | { code: 'CALLCCVARARGS' }
    | { code: 'CALLREF' }
    | { code: 'JMPREF' }
    | { code: 'JMPREFDATA' }
    | { code: 'RETDATA' }
    | { code: 'IFRET' }
    | { code: 'IFNOTRET' }
    | { code: 'IF' }
    | { code: 'IFNOT' }
    | { code: 'IFJMP' }
    | { code: 'IFNOTJMP' }
    | { code: 'IFELSE' }
    | { code: 'IFREF' }
    | { code: 'IFNOTREF' }
    | { code: 'IFJMPREF' }
    | { code: 'IFNOTJMPREF' }
    | { code: 'CONDSEL' }
    | { code: 'CONDSELCHK' }
    | { code: 'IFRETALT' }
    | { code: 'IFNOTRETALT' }
    | { code: 'IFREFELSE' }
    | { code: 'IFELSEREF' }
    | { code: 'IFREFELSEREF' }
    | { code: 'IFBITJMP', args: [number] }
    | { code: 'IFNBITJMP', args: [number] }
    | { code: 'IFBITJMPREF', args: [number] }
    | { code: 'IFNBITJMPREF', args: [number] }
    | { code: 'REPEAT' }
    | { code: 'REPEATEND' }
    | { code: 'UNTIL' }
    | { code: 'UNTILEND' }
    | { code: 'WHILE' }
    | { code: 'WHILEEND' }
    | { code: 'AGAIN' }
    | { code: 'AGAINEND' }
    | { code: 'REPEATBRK' }
    | { code: 'REPEATENDBRK' }
    | { code: 'UNTILBRK' }
    | { code: 'UNTILENDBRK' }
    | { code: 'WHILEBRK' }
    | { code: 'WHILEENDBRK' }
    | { code: 'AGAINBRK' }
    | { code: 'AGAINENDBRK' }
    | { code: 'SETCONTARGS', args: [number, number] }
    | { code: 'SETCONTVARARGS' }
    | { code: 'RETURNARGS', args: [number] }
    | { code: 'RETURNVARARGS' }
    | { code: 'SETNUMVARARGS' }
    | { code: 'BLESS' }
    | { code: 'BLESSVARARGS' }
    | { code: 'BLESSARGS', args: [number, number] }
    | { code: 'PUSHCTR', args: [number] }
    | { code: 'POPCTR', args: [number] }
    | { code: 'SETCONTCTR', args: [number] }
    | { code: 'SETRETCTR', args: [number] }
    | { code: 'SETALTCTR', args: [number] }
    | { code: 'POPSAVE', args: [number] }
    | { code: 'SAVE', args: [number] }
    | { code: 'SAVEALT', args: [number] }
    | { code: 'SAVEBOTH', args: [number] }
    | { code: 'PUSHCTRX' }
    | { code: 'POPCTRX' }
    | { code: 'SETCONTCTRX' }
    | { code: 'COMPOS' }
    | { code: 'COMPOSALT' }
    | { code: 'COMPOSBOTH' }
    | { code: 'ATEXIT' }
    | { code: 'ATEXITALT' }
    | { code: 'SETEXITALT' }
    | { code: 'THENRET' }
    | { code: 'THENRETALT' }
    | { code: 'INVERT' }
    | { code: 'BOOLEVAL' }
    | { code: 'SAMEALT' }
    | { code: 'SAMEALTSAVE' }
    | { code: 'CALL', args: [number] }
    | { code: 'JMP', args: [number] }
    | { code: 'PREPARE', args: [number] }
    | { code: 'THROW', args: [number] }
    | { code: 'THROWIF', args: [number] }
    | { code: 'THROWIFNOT', args: [number] }
    | { code: 'THROWARG', args: [number] }
    | { code: 'THROWARGIF', args: [number] }
    | { code: 'THROWARGIFNOT', args: [number] }
    | { code: 'THROWANY' }
    | { code: 'THROWARGANY' }
    | { code: 'THROWANYIF' }
    | { code: 'THROWARGANYIF' }
    | { code: 'THROWANYIFNOT' }
    | { code: 'THROWARGANYIFNOT' }
    | { code: 'TRY' }
    | { code: 'TRYARGS', args: [number, number] }
    | { code: 'STDICTS' }
    | { code: 'STDICT' }
    | { code: 'SKIPDICT' }
    | { code: 'LDDICTS' }
    | { code: 'PLDDICTS' }
    | { code: 'LDDICT' }
    | { code: 'PLDDICT' }
    | { code: 'LDDICTQ' }
    | { code: 'PLDDICTQ' }
    | { code: 'DICTGET' }
    | { code: 'DICTGETREF' }
    | { code: 'DICTIGET' }
    | { code: 'DICTIGETREF' }
    | { code: 'DICTUGET' }
    | { code: 'DICTUGETREF' }
    | { code: 'DICTSET' }
    | { code: 'DICTSETREF' }
    | { code: 'DICTISET' }
    | { code: 'DICTISETREF' }
    | { code: 'DICTUSET' }
    | { code: 'DICTUSETREF' }
    | { code: 'DICTSETGET' }
    | { code: 'DICTSETGETREF' }
    | { code: 'DICTISETGET' }
    | { code: 'DICTISETGETREF' }
    | { code: 'DICTUSETGET' }
    | { code: 'DICTUSETGETREF' }
    | { code: 'DICTREPLACE' }
    | { code: 'DICTREPLACEREF' }
    | { code: 'DICTIREPLACE' }
    | { code: 'DICTIREPLACEREF' }
    | { code: 'DICTUREPLACE' }
    | { code: 'DICTUREPLACEREF' }
    | { code: 'DICTREPLACEGET' }
    | { code: 'DICTREPLACEGETREF' }
    | { code: 'DICTIREPLACEGET' }
    | { code: 'DICTIREPLACEGETREF' }
    | { code: 'DICTUREPLACEGET' }
    | { code: 'DICTUREPLACEGETREF' }
    | { code: 'DICTADD' }
    | { code: 'DICTADDREF' }
    | { code: 'DICTIADD' }
    | { code: 'DICTIADDREF' }
    | { code: 'DICTUADD' }
    | { code: 'DICTUADDREF' }
    | { code: 'DICTADDGET' }
    | { code: 'DICTADDGETREF' }
    | { code: 'DICTIADDGET' }
    | { code: 'DICTIADDGETREF' }
    | { code: 'DICTUADDGET' }
    | { code: 'DICTUADDGETREF' }
    | { code: 'DICTSETB' }
    | { code: 'DICTISETB' }
    | { code: 'DICTUSETB' }
    | { code: 'DICTSETGETB' }
    | { code: 'DICTISETGETB' }
    | { code: 'DICTUSETGETB' }
    | { code: 'DICTREPLACEB' }
    | { code: 'DICTIREPLACEB' }
    | { code: 'DICTUREPLACEB' }
    | { code: 'DICTREPLACEGETB' }
    | { code: 'DICTIREPLACEGETB' }
    | { code: 'DICTUREPLACEGETB' }
    | { code: 'DICTADDB' }
    | { code: 'DICTIADDB' }
    | { code: 'DICTUADDB' }
    | { code: 'DICTADDGETB' }
    | { code: 'DICTIADDGETB' }
    | { code: 'DICTUADDGETB' }
    | { code: 'DICTDEL' }
    | { code: 'DICTIDEL' }
    | { code: 'DICTUDEL' }
    | { code: 'DICTDELGET' }
    | { code: 'DICTDELGETREF' }
    | { code: 'DICTIDELGET' }
    | { code: 'DICTIDELGETREF' }
    | { code: 'DICTUDELGET' }
    | { code: 'DICTUDELGETREF' }
    | { code: 'DICTGETOPTREF' }
    | { code: 'DICTIGETOPTREF' }
    | { code: 'DICTUGETOPTREF' }
    | { code: 'DICTSETGETOPTREF' }
    | { code: 'DICTISETGETOPTREF' }
    | { code: 'DICTUSETGETOPTREF' }
    | { code: 'PFXDICTSET' }
    | { code: 'PFXDICTREPLACE' }
    | { code: 'PFXDICTADD' }
    | { code: 'PFXDICTDEL' }
    | { code: 'DICTGETNEXT' }
    | { code: 'DICTGETNEXTEQ' }
    | { code: 'DICTGETPREV' }
    | { code: 'DICTGETPREVEQ' }
    | { code: 'DICTIGETNEXT' }
    | { code: 'DICTIGETNEXTEQ' }
    | { code: 'DICTIGETPREV' }
    | { code: 'DICTIGETPREVEQ' }
    | { code: 'DICTUGETNEXT' }
    | { code: 'DICTUGETNEXTEQ' }
    | { code: 'DICTUGETPREV' }
    | { code: 'DICTUGETPREVEQ' }
    | { code: 'DICTMIN' }
    | { code: 'DICTMINREF' }
    | { code: 'DICTIMIN' }
    | { code: 'DICTIMINREF' }
    | { code: 'DICTUMIN' }
    | { code: 'DICTUMINREF' }
    | { code: 'DICTMAX' }
    | { code: 'DICTMAXREF' }
    | { code: 'DICTIMAX' }
    | { code: 'DICTIMAXREF' }
    | { code: 'DICTUMAX' }
    | { code: 'DICTUMAXREF' }
    | { code: 'DICTREMMIN' }
    | { code: 'DICTREMMINREF' }
    | { code: 'DICTIREMMIN' }
    | { code: 'DICTIREMMINREF' }
    | { code: 'DICTUREMMIN' }
    | { code: 'DICTUREMMINREF' }
    | { code: 'DICTREMMAX' }
    | { code: 'DICTREMMAXREF' }
    | { code: 'DICTIREMMAX' }
    | { code: 'DICTIREMMAXREF' }
    | { code: 'DICTUREMMAX' }
    | { code: 'DICTUREMMAXREF' }
    | { code: 'DICTIGETJMP' }
    | { code: 'DICTUGETJMP' }
    | { code: 'DICTIGETEXEC' }
    | { code: 'DICTUGETEXEC' }
    | { code: 'DICTPUSHCONST', args: [number, Cell] }
    | { code: 'PFXDICTGETQ' }
    | { code: 'PFXDICTGET' }
    | { code: 'PFXDICTGETJMP' }
    | { code: 'PFXDICTGETEXEC' }
    | { code: 'PFXDICTCONSTGETJMP', args: [number] }
    | { code: 'DICTIGETJMPZ' }
    | { code: 'DICTUGETJMPZ' }
    | { code: 'DICTIGETEXECZ' }
    | { code: 'DICTUGETEXECZ' }
    | { code: 'SUBDICTGET' }
    | { code: 'SUBDICTIGET' }
    | { code: 'SUBDICTUGET' }
    | { code: 'SUBDICTRPGET' }
    | { code: 'SUBDICTIRPGET' }
    | { code: 'SUBDICTURPGET' }
    | { code: 'ACCEPT' }
    | { code: 'SETGASLIMIT' }
    | { code: 'BUYGAS' }
    | { code: 'GRAMTOGAS' }
    | { code: 'GASTOGRAM' }
    | { code: 'COMMIT' }
    | { code: 'RANDU256' }
    | { code: 'RAND' }
    | { code: 'SETRAND' }
    | { code: 'ADDRAND' }
    | { code: 'GETPARAM', args: [number] }
    | { code: 'NOW' }
    | { code: 'BLOCKLT' }
    | { code: 'LTIME' }
    | { code: 'RANDSEED' }
    | { code: 'BALANCE' }
    | { code: 'MYADDR' }
    | { code: 'CONFIGROOT' }
    | { code: 'CONFIGDICT' }
    | { code: 'CONFIGPARAM' }
    | { code: 'CONFIGOPTPARAM' }
    | { code: 'GETGLOBVAR' }
    | { code: 'GETGLOB', args: [number] }
    | { code: 'SETGLOBVAR' }
    | { code: 'SETGLOB', args: [number] }
    | { code: 'HASHCU' }
    | { code: 'HASHSU' }
    | { code: 'SHA256U' }
    | { code: 'CHKSIGNU' }
    | { code: 'CHKSIGNS' }
    | { code: 'CDATASIZEQ' }
    | { code: 'CDATASIZE' }
    | { code: 'SDATASIZEQ' }
    | { code: 'SDATASIZE' }
    | { code: 'LDGRAMS' }
    | { code: 'LDVARINT16' }
    | { code: 'STGRAMS' }
    | { code: 'STVARINT16' }
    | { code: 'LDVARUINT32' }
    | { code: 'LDVARINT32' }
    | { code: 'STVARUINT32' }
    | { code: 'STVARINT32' }
    | { code: 'LDMSGADDR' }
    | { code: 'LDMSGADDRQ' }
    | { code: 'PARSEMSGADDR' }
    | { code: 'PARSEMSGADDRQ' }
    | { code: 'REWRITESTDADDR' }
    | { code: 'REWRITESTDADDRQ' }
    | { code: 'REWRITEVARADDR' }
    | { code: 'REWRITEVARADDRQ' }
    | { code: 'SENDRAWMSG' }
    | { code: 'RAWRESERVE' }
    | { code: 'RAWRESERVEX' }
    | { code: 'SETCODE' }
    | { code: 'SETLIBCODE' }
    | { code: 'CHANGELIB' }
    | { code: 'DUMPSTK' }
    | { code: 'DUMPSTKTOP', args: [number] }
    | { code: 'HEXDUMP' }
    | { code: 'HEXPRINT' }
    | { code: 'BINDUMP' }
    | { code: 'BINPRINT' }
    | { code: 'STRDUMP' }
    | { code: 'STRPRINT' }
    | { code: 'DEBUGOFF' }
    | { code: 'DEBUGON' }
    | { code: 'DUMP', args: [number] }
    | { code: 'PRINT', args: [number] }
    | { code: 'DUMPTOSFMT', args: [number] }
    | { code: 'LOGSTR', args: [string] }
    | { code: 'LOGFLUSH' }
    | { code: 'PRINTSTR', args: [string] }
    | { code: 'SETCP', args: [number] }
    | { code: 'SETCPX' };